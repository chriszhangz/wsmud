"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("../task");
const core_1 = require("../../core");
const bluebird_1 = require("bluebird");
const fs_1 = require("fs");
function getReverse(dir) {
    switch (dir) {
        case "northeast":
            return "southwest";
        case "southeast":
            return "northwest";
        case "northwest":
            return "southeast";
        case "southwest":
            return "northeast";
        case "north":
            return "south";
        case "south":
            return "north";
        case "west":
            return "east";
        case "east":
            return "west";
        case "northup":
            return "southdown";
        case "southup":
            return "northdown";
        case "westup":
            return "eastdown";
        case "eastup":
            return "westdown";
        case "northdown":
            return "southup";
        case "southdown":
            return "northup";
        case "westdown":
            return "eastup";
        case "eastdown":
            return "westup";
        case "up":
            return "down";
        case "down":
            return "up";
        case "enter":
            return "out";
        case "out":
            return "enter";
    }
    throw `not support direct: ${dir}`;
}
/**
 * 绘制地图的工具。
 */
class MapTask extends task_1.Task {
    constructor() {
        super();
        this.priority = 100;
    }
    async start(session, config) {
        //session.on("message", msg => console.log(msg));
        async function M(rooms, parent, exit) {
            const exitsData = (await session.waitData("exits")).items;
            const roomData = session.world.room;
            const roomId = roomData.path;
            let room = rooms.find(r => r.id == roomId);
            if (room) {
                if (room.level <= parent.level + 1)
                    return;
            }
            else {
                room = {
                    id: roomId,
                    name: roomData.name,
                    desc: roomData.desc,
                    exits: [],
                    level: parent.level + 1
                };
                rooms.push(room);
            }
            exit.to = roomId;
            room.parent = parent.id;
            room.parentToHere = exit;
            room.level = parent.level + 1;
            if (roomId == 'huashan/siguoya') {
                await session.sendAsync("break bi");
                // await session.waitData<Exits>("exits")
            }
            else if (roomId == "yz/home") {
                delete exitsData.enter;
            }
            else if (roomId == "yz/banghui") {
                delete exitsData.east;
            }
            else if (roomId == "huashan/zygong") {
                delete exitsData.eastup;
            }
            console.log(`${roomId} ${room.name}`);
            for (const key in exitsData) {
                const ex = { type: "go", action: key, to: '' };
                room.exits.push(ex);
                const reverseKey = getReverse(key);
                if (reverseKey == exit.action) {
                    ex.to = parent.id;
                    continue;
                }
                await session.sendAsync(`go ${key}`);
                await M(rooms, room, ex);
                await session.sendAsync(`go ${reverseKey}`);
                await session.waitData("exits");
                const backRoom = session.world.room;
                if (backRoom.path != roomId)
                    throw '没有回到原来的房间';
            }
        }
        await bluebird_1.Promise.delay(1000);
        for (const exit of core_1.rootRoom.exits) {
            const rooms = [];
            if (exit.type != 'cmd')
                throw "type should be cmd";
            await session.sendAsync(exit.action);
            await M(rooms, core_1.rootRoom, exit);
            var fileName = exit.to.split("/")[0];
            await bluebird_1.Promise.promisify(fs_1.writeFile)(`./core/rooms/${fileName}.json`, JSON.stringify(rooms));
        }
        this.priority = -1;
    }
}
exports.MapTask = MapTask;
//# sourceMappingURL=map.js.map