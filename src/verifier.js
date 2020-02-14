// Copyright 2020 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.


import { EngineRunner } from "@cartesi/creepts-engine";
import { loadLevel, loadMap } from "@cartesi/creepts-mappack";

const MAP_NAMES = [
    "original",
    "waiting_line",
    "turn_round",
    "hurry",
    "civyshk_yard",
    "civyshk_2y",
    "civyshk_line5",
    "civyshk_labyrinth",
];

export default function (args, readFile, stdout, progress) {
    const logsFile = readFile(args[2]);
    const mapIndex = parseInt(args[3]);

    if (mapIndex < 0 || mapIndex >= MAP_NAMES.length) {
        stdout(0 + '\t' + `Invalid map index: ${mapIndex}`);
        return;
    }

    const map = loadMap(MAP_NAMES[mapIndex]);
    const level = loadLevel(map);
    const logs = JSON.parse(logsFile);

    progress = (args.indexOf('--debug') >= 0 || args.indexOf('-d') >= 0) ? progress : undefined;
    
    try {
        const runner = new EngineRunner(level);
        const state = runner.run(logs, progress);
        
        // Output score
        stdout(state.score + "\t");
    
    } catch (e) {
    
        // Output score
        stdout(0 + "\t" + e.message);
    
        // Exit program with failure
        throw e;
    }
};
