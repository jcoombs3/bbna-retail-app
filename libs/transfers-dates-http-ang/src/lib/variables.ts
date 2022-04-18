import { InjectionToken } from '@angular/core';

export const TRANSFERS_RESTRICTED_DATES_BASE_PATH = new InjectionToken<string>('TRANSFERS_RESTRICTED_DATES_BASE_PATH');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}
