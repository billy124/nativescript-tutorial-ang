"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var grocery_list_service_1 = require("../../shared/grocery/grocery-list.service");
var SocialShare = require("nativescript-social-share");
var ListComponent = (function () {
    function ListComponent(groceryListService, zone) {
        this.groceryListService = groceryListService;
        this.zone = zone;
        this.groceryList = [];
        this.grocery = "";
        this.isLoading = false;
        this.listLoaded = false;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.groceryListService.load()
            .subscribe(function (loadedGroceries) {
            loadedGroceries.forEach(function (groceryObject) {
                _this.groceryList.unshift(groceryObject);
            });
            _this.isLoading = false;
            _this.listLoaded = true;
        });
    };
    ListComponent.prototype.add = function () {
        var _this = this;
        if (this.grocery.trim() === "") {
            alert("Enter a grocery item");
            return;
        }
        // Dismiss the keyboard
        var textField = this.groceryTextField.nativeElement;
        textField.dismissSoftInput();
        this.groceryListService.add(this.grocery)
            .subscribe(function (groceryObject) {
            _this.groceryList.unshift(groceryObject);
            _this.grocery = "";
        }, function () {
            alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
            });
            _this.grocery = "";
        });
    };
    ListComponent.prototype.delete = function (grocery) {
        var _this = this;
        this.groceryListService.delete(grocery.id)
            .subscribe(function () {
            // Running the array splice in a zone ensures that change detection gets triggered.
            _this.zone.run(function () {
                var index = _this.groceryList.indexOf(grocery);
                _this.groceryList.splice(index, 1);
            });
        });
    };
    ListComponent.prototype.share = function () {
        var listString = this.groceryList
            .map(function (grocery) { return grocery.name; })
            .join(", ")
            .trim();
        SocialShare.shareText(listString);
    };
    return ListComponent;
}());
__decorate([
    core_1.ViewChild("groceryTextField"),
    __metadata("design:type", core_1.ElementRef)
], ListComponent.prototype, "groceryTextField", void 0);
ListComponent = __decorate([
    core_1.Component({
        selector: "list",
        templateUrl: "pages/list/list.html",
        styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
        providers: [grocery_list_service_1.GroceryListService]
    }),
    __metadata("design:paramtypes", [grocery_list_service_1.GroceryListService,
        core_1.NgZone])
], ListComponent);
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRTtBQUkvRSxrRkFBNkU7QUFDN0UsdURBQXlEO0FBUXpELElBQWEsYUFBYTtJQVF0Qix1QkFBb0Isa0JBQXNDLEVBQ3RDLElBQVk7UUFEWix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQVE7UUFSaEMsZ0JBQVcsR0FBbUIsRUFBRSxDQUFDO1FBQ2pDLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7SUFNbkIsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUU7YUFDekIsU0FBUyxDQUFDLFVBQUEsZUFBZTtZQUN0QixlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUMsYUFBYTtnQkFDbEMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCwyQkFBRyxHQUFIO1FBQUEsaUJBd0JDO1FBdkJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QixLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsdUJBQXVCO1FBQ3ZCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7UUFDL0QsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFN0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3BDLFNBQVMsQ0FDTixVQUFBLGFBQWE7WUFDVCxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4QyxLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUN0QixDQUFDLEVBQ0Q7WUFDSSxLQUFLLENBQUM7Z0JBQ0YsT0FBTyxFQUFFLHNEQUFzRDtnQkFDL0QsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDO1lBQ0gsS0FBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQsOEJBQU0sR0FBTixVQUFPLE9BQWdCO1FBQXZCLGlCQVNDO1FBUkcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2FBQ3JDLFNBQVMsQ0FBQztZQUNQLG1GQUFtRjtZQUNuRixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDVixJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDOUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsNkJBQUssR0FBTDtRQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXO2FBQzVCLEdBQUcsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLEVBQVosQ0FBWSxDQUFDO2FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDVixJQUFJLEVBQUUsQ0FBQztRQUVaLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQXJFRCxJQXFFQztBQS9Ea0M7SUFBOUIsZ0JBQVMsQ0FBQyxrQkFBa0IsQ0FBQzs4QkFBbUIsaUJBQVU7dURBQUM7QUFObkQsYUFBYTtJQU56QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU07UUFDaEIsV0FBVyxFQUFFLHNCQUFzQjtRQUNuQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxxQkFBcUIsQ0FBQztRQUNoRSxTQUFTLEVBQUUsQ0FBQyx5Q0FBa0IsQ0FBQztLQUNsQyxDQUFDO3FDQVMwQyx5Q0FBa0I7UUFDaEMsYUFBTTtHQVR2QixhQUFhLENBcUV6QjtBQXJFWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBOZ1pvbmUsIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5cbmltcG9ydCB7R3JvY2VyeX0gZnJvbSBcIi4uLy4uL3NoYXJlZC9ncm9jZXJ5L2dyb2NlcnlcIjtcbmltcG9ydCB7R3JvY2VyeUxpc3RTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dyb2NlcnkvZ3JvY2VyeS1saXN0LnNlcnZpY2VcIjtcbmltcG9ydCAqIGFzIFNvY2lhbFNoYXJlIGZyb20gXCJuYXRpdmVzY3JpcHQtc29jaWFsLXNoYXJlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcImxpc3RcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9saXN0L2xpc3QuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvbGlzdC9saXN0LWNvbW1vbi5jc3NcIiwgXCJwYWdlcy9saXN0L2xpc3QuY3NzXCJdLFxuICAgIHByb3ZpZGVyczogW0dyb2NlcnlMaXN0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgZ3JvY2VyeUxpc3Q6IEFycmF5PEdyb2Nlcnk+ID0gW107XG4gICAgZ3JvY2VyeSA9IFwiXCI7XG4gICAgaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgbGlzdExvYWRlZCA9IGZhbHNlO1xuXG4gICAgQFZpZXdDaGlsZChcImdyb2NlcnlUZXh0RmllbGRcIikgZ3JvY2VyeVRleHRGaWVsZDogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvY2VyeUxpc3RTZXJ2aWNlOiBHcm9jZXJ5TGlzdFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmdyb2NlcnlMaXN0U2VydmljZS5sb2FkKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUobG9hZGVkR3JvY2VyaWVzID0+IHtcbiAgICAgICAgICAgICAgICBsb2FkZWRHcm9jZXJpZXMuZm9yRWFjaCgoZ3JvY2VyeU9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2NlcnlMaXN0LnVuc2hpZnQoZ3JvY2VyeU9iamVjdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkKCkge1xuICAgICAgICBpZiAodGhpcy5ncm9jZXJ5LnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgICAgICAgYWxlcnQoXCJFbnRlciBhIGdyb2NlcnkgaXRlbVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERpc21pc3MgdGhlIGtleWJvYXJkXG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPnRoaXMuZ3JvY2VyeVRleHRGaWVsZC5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuXG4gICAgICAgIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLmFkZCh0aGlzLmdyb2NlcnkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGdyb2NlcnlPYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb2NlcnlMaXN0LnVuc2hpZnQoZ3JvY2VyeU9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvY2VyeSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgYWRkaW5nIGFuIGl0ZW0gdG8geW91ciBsaXN0LlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvY2VyeSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZWxldGUoZ3JvY2VyeTogR3JvY2VyeSkge1xuICAgICAgICB0aGlzLmdyb2NlcnlMaXN0U2VydmljZS5kZWxldGUoZ3JvY2VyeS5pZClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFJ1bm5pbmcgdGhlIGFycmF5IHNwbGljZSBpbiBhIHpvbmUgZW5zdXJlcyB0aGF0IGNoYW5nZSBkZXRlY3Rpb24gZ2V0cyB0cmlnZ2VyZWQuXG4gICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ3JvY2VyeUxpc3QuaW5kZXhPZihncm9jZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm9jZXJ5TGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hhcmUoKSB7XG4gICAgICAgIGxldCBsaXN0U3RyaW5nID0gdGhpcy5ncm9jZXJ5TGlzdFxuICAgICAgICAgICAgLm1hcChncm9jZXJ5ID0+IGdyb2NlcnkubmFtZSlcbiAgICAgICAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgICAgICAgIC50cmltKCk7XG5cbiAgICAgICAgU29jaWFsU2hhcmUuc2hhcmVUZXh0KGxpc3RTdHJpbmcpO1xuICAgIH1cbn0iXX0=