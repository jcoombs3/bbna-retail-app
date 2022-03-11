#!/usr/bin/env groovy

@Library(['jenkins-shared-library@latest', 'wa3-fa-shared-library@latest']) _

import com.backbase.jenkins.Monorepo

pipeline {

  agent {
    kubernetes {
      yamlFile '.sdlc/pods/jenkins-agent.yaml'
    }
  }

  triggers {
    pollSCM('')
    bitbucketPush()
  }

  environment {
    PROJECT                   = "BSFG"
    REPO                      = "backbase-banking-apps"
    RELEASE_ON_MERGE_TO       = /(main|release\/(\d+\.)+\d+)$/
    NODE_JS_INSTALLATION_NAME = "${Monorepo.NODE_INSTALLATION_NAME}"
    SETTINGS_ID               = "33802177-400f-414c-9807-fdc9d63daa33"
    TARGET_BRANCH             = "${env.CHANGE_TARGET && env.CHANGE_TARGET.length() ? env.CHANGE_TARGET : env.BRANCH_NAME}"
    DOCKER_REGISTRY           = "harbor.backbase.eu"
    HARBOR_PROJECT            = "staging"
  }

  stages {

    stage('Set up') {
      steps {
        runFeSetupWorkspace()
      }
    }

    stage('Install deps') {
      steps {
        runFeInstall()
      }
    }

    stage('Format Check') {
      failFast true
      parallel {
        stage('Verify lock file') {
          when { not { expression { BRANCH_NAME ==~ RELEASE_ON_MERGE_TO } } }
          steps {
            runFeVerifyLockFile()
          }
        }

        stage('Linting') {
          when { not { expression { BRANCH_NAME ==~ RELEASE_ON_MERGE_TO } } }
          steps {
            runFeLint()
            echo "Run linting..."
          }
        }

        stage('Formatting') {
          when { not { expression { BRANCH_NAME ==~ RELEASE_ON_MERGE_TO } } }
          steps {
            runFeFormat()
          }
        }
      }
    }

    stage('Build') {
      steps {
        script {
          nodejs(nodeJSInstallationName: NODE_JS_INSTALLATION_NAME, configId: env.NPM_SETTINGS_ID) {
            sh "npx nx affected:build --prod --parallel=1 ${env.CHANGE_TARGET ? "--base origin/${env.CHANGE_TARGET}" : "--head=${env.TARGET_BRANCH} --base=HEAD~1"}"
          }
        }
      }
    }

    stage('Tests') {
      failFast true
      parallel {
        stage('Unit tests') {
          steps {
            script {
              nodejs(nodeJSInstallationName: env.NODE_JS_INSTALLATION_NAME, configId: env.NPM_SETTINGS_ID) {
                sh "npx nx affected:test ${env.CHANGE_TARGET ? "--base origin/${env.CHANGE_TARGET}" : "--head=${env.TARGET_BRANCH} --base=HEAD~1"}"
              }
            }
          }
        }
        stage('E2E tests') {
          steps {
            script {
              echo "Run e2e..."
              /*
               * TODO: Temp disabled, because there are few e2e errors in retail-app
              nodejs(nodeJSInstallationName: env.NODE_JS_INSTALLATION_NAME, configId: env.NPM_SETTINGS_ID) {
                sh "npx webdriver-manager update --versions.chrome=2.37 --gecko=false"
                sh "npx nx affected:e2e ${env.CHANGE_TARGET ? "--base origin/${env.CHANGE_TARGET}" : "--head=${env.TARGET_BRANCH} --base=HEAD~1"} --webdriverUpdate=false"
              }
               */
            }
          }
        }
      }
    }

    stage('Sonar Scan') {
      when {
        expression {
          script {
            nodejs(nodeJSInstallationName: env.NODE_JS_INSTALLATION_NAME, configId: env.NPM_SETTINGS_ID) {
              def affected = sh(script: "npx nx print-affected --select=projects ${env.CHANGE_TARGET ? "--base origin/${env.CHANGE_TARGET}" : "--head=${env.TARGET_BRANCH} --base=HEAD~1"}", returnStdout: true).trim()
              return !affected.isEmpty()
            }
          }
        }
      }
      steps {
        runFeSonar()
      }
    }

    stage('Bump Version') {
      when { expression { BRANCH_NAME ==~ RELEASE_ON_MERGE_TO } }
      steps {
        script {
          bumpVersion()
        }
      }
    }

    stage('Publish Docker Image'){
      when { expression { BRANCH_NAME ==~ RELEASE_ON_MERGE_TO } }
      steps {
        script {
          def imageTag = runFeUtils.getPackageVersion()

          withCredentials([
            usernamePassword(credentialsId: 'harbor-credentials', usernameVariable: 'HARBOR_USERNAME', passwordVariable: 'HARBOR_PASSWORD'),
            usernamePassword(credentialsId: "artifactory_auto-release", usernameVariable: 'ARTIFACTORY_USERNAME', passwordVariable: 'ARTIFACTORY_PASSWORD')
          ]) {
            sh "echo ${HARBOR_PASSWORD} | docker login ${env.DOCKER_REGISTRY} -u ${HARBOR_USERNAME} --password-stdin"
            sh "echo ${ARTIFACTORY_PASSWORD} | docker login repo.backbase.com -u ${ARTIFACTORY_USERNAME} --password-stdin"

            nodejs(nodeJSInstallationName: env.NODE_JS_INSTALLATION_NAME, configId: env.NPM_SETTINGS_ID) {
              sh "npx nx affected ${env.CHANGE_TARGET ? "--base origin/${env.CHANGE_TARGET}" : "--head=${env.TARGET_BRANCH} --base=HEAD~2"} --target=build-docker --docker-registry=${env.DOCKER_REGISTRY}/${env.HARBOR_PROJECT} --image-tag=${imageTag}"
              sh "npx nx affected ${env.CHANGE_TARGET ? "--base origin/${env.CHANGE_TARGET}" : "--head=${env.TARGET_BRANCH} --base=HEAD~2"} --target=build-docker --docker-registry=${env.DOCKER_REGISTRY}/${env.HARBOR_PROJECT} --image-tag=latest"

              sh "npx nx affected ${env.CHANGE_TARGET ? "--base origin/${env.CHANGE_TARGET}" : "--head=${env.TARGET_BRANCH} --base=HEAD~2"} --target=push-docker --docker-registry=${env.DOCKER_REGISTRY}/${env.HARBOR_PROJECT} --image-tag=${imageTag}"
              sh "npx nx affected ${env.CHANGE_TARGET ? "--base origin/${env.CHANGE_TARGET}" : "--head=${env.TARGET_BRANCH} --base=HEAD~2"} --target=push-docker --docker-registry=${env.DOCKER_REGISTRY}/${env.HARBOR_PROJECT} --image-tag=latest"

              sh "npx nx affected ${env.CHANGE_TARGET ? "--base origin/${env.CHANGE_TARGET}" : "--head=${env.TARGET_BRANCH} --base=HEAD~2"} --target=remove-docker --docker-registry=${env.DOCKER_REGISTRY}/${env.HARBOR_PROJECT} --image-tag=${imageTag}"
              sh "npx nx affected ${env.CHANGE_TARGET ? "--base origin/${env.CHANGE_TARGET}" : "--head=${env.TARGET_BRANCH} --base=HEAD~2"} --target=remove-docker --docker-registry=${env.DOCKER_REGISTRY}/${env.HARBOR_PROJECT} --image-tag=latest"
            }
          }
        }
      }
    }

  }
}

def getChangedFiles(path = '.') {
    def remote = env.TARGET_BRANCH == 'main' ? 'upstream' : 'origin';
    return sh(returnStdout: true, script: "git diff --name-only refs/remotes/${remote}/${env.TARGET_BRANCH} -- ${path}").trim();
}

def isTagExistInHarbor(projectName, repoName, tagName) {
  def httpResponseCode = sh(returnStdout: true, script: "curl -XGET -LI https://harbor.backbase.eu/api/v2.0/projects/${projectName}/repositories/${repoName}/artifacts/${tagName}/tags -o /dev/null -w '%{http_code}' -s").trim();
  return httpResponseCode.contains("200");
}

def checkVersion(projectName, repoNameList, version) {
  repoNameList.each ({ repoName ->
    if (isTagExistInHarbor(projectName, repoName, version)) {
      error "${version} already exist. Please bump the version in the package.json";
    }
  })
}

def getBumpType(String currentVersion, String gitLog) {
  if (gitLog.indexOf("bump/") >= 0) {
    return "no"
  } else if (currentVersion.indexOf("-") >= 0) {
    return "prerelease --preid=pr"
  } else {
    return gitLog.indexOf("bugfix") >= 0 || gitLog.indexOf("hotfix") >= 0 ? "patch" : "minor"
  }
}

/**
 * If you want to bump the version manually:
 *    1. Update the version in package.json file
 *    2. set your git commit message as follow: "... bump/0.0.2 ..." in order to get bumpType = no
 *
 * Otherwise: The version will be bumped automatically
 */
def bumpVersion() {
  nodejs(nodeJSInstallationName: NODE_JS_INSTALLATION_NAME, configId: env.NPM_SETTINGS_ID) {
    def branch = env.TARGET_BRANCH;
    def currentVersion = runFeUtils.getPackageVersion()
    def gitLog =  sh(returnStdout: true, script: "git log -1")
    def bumpType = getBumpType(currentVersion, gitLog)
    def packageLockJsonFileName = "package-lock.json"

    println "BUMP: bumpType: ${bumpType}"

    if (bumpType != "no") {
      println "BUMP!!!: Version ${currentVersion} will auto bump with bump type: ${bumpType}"

      def newVersion = sh(script: "npm --no-git-tag-version version $bumpType", returnStdout: true).trim()
      newVersion = newVersion.replace('v', '');

      sh "git commit package.json $packageLockJsonFileName -m 'Bump the version to $newVersion'"
      sh "git tag -a $newVersion -m 'Bump the version to $newVersion' --force"

      println "Version is bumped to ${newVersion}"
    } else {
      sh "git tag -a $currentVersion -m 'Bump the version to $currentVersion' --force"
      println "Manual bump to: ${currentVersion}"
    }

    sshagent(["stash_clippyservice_ssh_key"]) {
      sh "git status";
      sh "git push origin HEAD:$branch --tags --force";
    }

    println("Master pushed bumps!");
  }
}
