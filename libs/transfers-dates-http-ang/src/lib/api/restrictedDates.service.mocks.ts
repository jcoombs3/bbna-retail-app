import { createMocks } from '@backbase/foundation-ang/data-http';
import { Provider } from '@angular/core';

/**
* Mocks provider for /transfers-restricted-dates/restricted-dates URL pattern
*/
export const RestrictedDatesHttpServiceRestrictedDatesGetMocksProvider: Provider = createMocks([{
        urlPattern: "/transfers-restricted-dates/restricted-dates",
        method: "GET",
        responses: [
                {
                    status: 200,
                    body: {
  "$ref" : "examples/body/restricted-dates-get.json"
}
                },
    ]
}]);

export const RestrictedDatesHttpServiceMocksProvider: Provider = createMocks(
    [
    {
        urlPattern: "/transfers-restricted-dates/restricted-dates",
        method: "GET",
        responses: [

            {
                status: 200,
                body: {
                    startDate: '2022-04-04',
                    endDate: '2022-04-17',
                    restrictedDates: ['2022-04-10', '2022-04-11', '2022-04-12', '2022-04-13']
                }
               },
    ]
},
]
);


