import { Task } from "../task";
import { Session, rootRoom, Roomd, Exitd, Exits } from "../../core";
import { UserConfig } from "../interface";
import { Promise } from 'bluebird';
import { writeFile } from "fs";
import { appendFile } from "fs";

function getReverse(dir: string) {
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
export class MapTask extends Task {

    constructor() {
        super();
        this.priority = 100;
    }

    async start(session: Session, config: UserConfig) {

        //session.on("message", msg => console.log(msg));
        async function M(rooms: Roomd[], parent: Roomd, exit: Exitd) {

            const exitsData = (await session.waitData<Exits>("exits")).items;
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
            } else if (roomId == "yz/home") {
                delete exitsData.enter;
            } else if (roomId == "yz/banghui") {
                delete exitsData.east;
            } else if (roomId == "huashan/zygong") {
                delete exitsData.eastup;
            }

            console.log(`${roomId} ${room.name}`);
            //var myDate = new Date();
            //var mytime=myDate.toLocaleTimeString();
            //await Promise.promisify(appendFile)(`./core/rooms/test.json`, mytime+`${roomId} ${room.name}\n`);
            for (const key in exitsData) {
                const ex: Exitd = { type: "go", action: key, to: '' };
                room.exits.push(ex);

                const reverseKey = getReverse(key);
                if (reverseKey == exit.action) {
                    ex.to = parent.id;
                    continue;
                }
                await session.sendAsync(`go ${key}`);
                await M(rooms, room, ex);
                await session.sendAsync(`go ${reverseKey}`);

                await session.waitData<Exits>("exits");
                const backRoom = session.world.room
                if (backRoom.path != roomId)
                    throw '没有回到原来的房间';
            }
        }

        await Promise.delay(1000);
        for (const exit of rootRoom.exits) {
            const rooms = [];
            if (exit.type != 'cmd')
                throw "type should be cmd";
            await session.sendAsync(exit.action);
            await M(rooms, rootRoom, exit);
            var fileName = exit.to.split("/")[0];
            await Promise.promisify(writeFile)(`./core/rooms/${fileName}.json`, JSON.stringify(rooms));
        }
        this.priority = -1;
    }


}