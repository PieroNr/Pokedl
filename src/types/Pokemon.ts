import Description from "./Description";
import Type from "./Type.ts";
export default interface Pokemon {
    id: number;
    name: string;
    description: Description[];
    firstType: Type;
    secondType: Type | null;
    habitation: string | null;
    color: string;
    evolutionState: number;
    isFullEvolution: boolean;
    height: number;
    weight: number;
    generation: number;
    spriteUrl: string;
    officialArtworkUrl: string;
    cardUrl: string;

  }