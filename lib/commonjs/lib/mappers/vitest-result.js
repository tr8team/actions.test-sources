class VitestResultMapper {
    map(name, url, input) {
        return {
            name,
            url,
            data: {
                type: "test-result",
                fail: input.numFailedTests,
                pass: input.numPassedTests,
                skip: input.numTotalTests - input.numPassedTests - input.numFailedTests,
            },
        };
    }
}
export { VitestResultMapper };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZXN0LXJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFwcGVycy92aXRlc3QtcmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sa0JBQWtCO0lBQ3RCLEdBQUcsQ0FBQyxJQUFZLEVBQUUsR0FBVyxFQUFFLEtBQW1CO1FBQ2hELE9BQU87WUFDTCxJQUFJO1lBQ0osR0FBRztZQUNILElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsSUFBSSxFQUFFLEtBQUssQ0FBQyxjQUFjO2dCQUMxQixJQUFJLEVBQUUsS0FBSyxDQUFDLGNBQWM7Z0JBQzFCLElBQUksRUFBRSxLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLGNBQWM7YUFDeEU7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTb3VyY2VNYXBwZXIgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3NvdXJjZS1tYXBwZXJcIjtcbmltcG9ydCB7IFZpdGVzdFJlc3VsdCB9IGZyb20gXCIuLi9zb3VyY2VzL3ZpdGVzdC1yZXN1bHRcIjtcbmltcG9ydCB7IE91dHB1dCB9IGZyb20gXCIuLi9vdXRwdXRcIjtcblxuY2xhc3MgVml0ZXN0UmVzdWx0TWFwcGVyIGltcGxlbWVudHMgU291cmNlTWFwcGVyPFZpdGVzdFJlc3VsdD4ge1xuICBtYXAobmFtZTogc3RyaW5nLCB1cmw6IHN0cmluZywgaW5wdXQ6IFZpdGVzdFJlc3VsdCk6IE91dHB1dCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWUsXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHR5cGU6IFwidGVzdC1yZXN1bHRcIixcbiAgICAgICAgZmFpbDogaW5wdXQubnVtRmFpbGVkVGVzdHMsXG4gICAgICAgIHBhc3M6IGlucHV0Lm51bVBhc3NlZFRlc3RzLFxuICAgICAgICBza2lwOiBpbnB1dC5udW1Ub3RhbFRlc3RzIC0gaW5wdXQubnVtUGFzc2VkVGVzdHMgLSBpbnB1dC5udW1GYWlsZWRUZXN0cyxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgeyBWaXRlc3RSZXN1bHRNYXBwZXIgfTtcbiJdfQ==