// when a module is loaded @provide() will automatically register it
import "../mongodb/connection";
import "../mongodb/client";

//Controllers
import "../../controllers/user-controller";
import "../../controllers/home-controller";

//Services
import "../../services/user-service";
