import LoginPage from "./LoginPage";
import UserPage from "./UserPage";
import InventoryPage from "./InventoryPage";

class AllPages {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.userPage = new UserPage(page);
    }
}

export default AllPages;