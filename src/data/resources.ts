import {Resource} from "../types/types";

export type ResourceNames = "stone" | "meteorite" | "iron" | "coal" | "ironBar";

const RESOURCES: Resource[] = [
    {id: "stone", planet: "earth", amount: 0, totalFound: 0, sellValue: 1, label: "Stone", tooltip: `Rock solid.`},
    {id: "iron", planet: "earth", amount: 0, totalFound: 0, sellValue: 0, label: "Iron", tooltip: "Most common metal."},
    {id: "coal", planet: "earth", amount: 0, totalFound: 0, sellValue: 0, label: "Coal", tooltip: "Fuel for forgery."},
    {id: "ironBar", planet: "earth", amount: 0, totalFound: 0, sellValue: 10, label: "Iron Bar", tooltip: "."},
    {id: "meteorite", planet: "earth", amount: 0, totalFound: 0, sellValue: 50, label: "Meteorite", tooltip: "Object from outer space."},
];

export default RESOURCES;
