declare global {
    interface Window { observer: any }
} 

let observer: {[key: string]: any; } = {};

if(window) {
if(!window.observer) window.observer = observer;
else observer = window.observer;
}

export function firstSet(id: string, data: any){
    if(observer[id]) throw new Error("Conflict observer id.");
    observer[id] = {
        beforeValue: data,
        currentValue: data,
        events: {
        diff: [],
        same: []
        }
    }
}

export function set(id: string, data: any){
    if(!observer[id]) firstSet(id, "");
    observer[id].beforeValue = observer[id].currentValue;
    observer[id].currentValue = data;

    if(observer[id].beforeValue != observer[id].currentValue) {
        for(const event of observer[id].events.diff) {
        event(observer[id].beforeValue, observer[id].currentValue);
        }
    }
    else if(observer[id].beforeValue == observer[id].currentValue){
        for(const event of observer[id].events.same) {
        event(observer[id].beforeValue, observer[id].currentValue);
        }
    }
}

export function registerEvent(id: string, type: "diff"|"same", callback: {(before:any, current:any): any}){
    if(!observer[id]) firstSet(id, "");

    if(type=="diff") {
        observer[id].events.diff.push(callback);
    }
    else if(type=="same") {
        observer[id].events.same.push(callback);
    }
}

export default { firstSet: firstSet, set:set, registerEvent:registerEvent }
