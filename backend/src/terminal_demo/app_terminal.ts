import * as statement from "./printStatements.js";
import {print, waitForKey} from "./ConsoleUtils.js";


console.log("a");
print(statement.getStartup());
waitForKey("a");

let running = true;
print("next");


