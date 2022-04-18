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
                    startDate: '2022-04-05',
                    endDate: '2022-04-28',
                    restrictedDates: ['2022-04-20', '2022-04-21', '2022-04-22', '2022-04-23']
                }
               },
    ]
},
]
);


