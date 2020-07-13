import "reflect-metadata";
import { App } from "./app";
import { environment } from "./environment/environment";

export const server = new App()
  .start(+environment.PORT || 3000)
  .then(port => console.log(`server started at http://localhost:${port}`))
  .catch(err => {
    console.log(
      `Unable to start the server \n Possible Reason ${JSON.stringify(err)}`
    );
  });
