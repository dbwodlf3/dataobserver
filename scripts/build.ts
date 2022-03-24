import path from "path";
import { spawn } from "child_process";
import common from "./common";

const ts_build = spawn(`cd ${common.projectRoot} && npx tsc --project ${common.projectRoot}/tsconfig.json`, {
    shell: true, stdio: "inherit"
});

ts_build.on("close", ()=>{
    
    spawn(`cd ${common.projectRoot} && npx browserify dest/src/index.js -o dest/src/index.js`, 
    {
        shell: true, stdio: "inherit"
    });
});
