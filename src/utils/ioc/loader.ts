// when a module is loaded @provide() will automatically register it
import "../mongodb/connection";
import "../mongodb/client";

//Controllers
import "../../controllers/user-controller";
import "../../controllers/home-controller";
import "../../controllers/auth-controller";

//Services
import "../../services/user-service";
import "../../services/auth-service";
