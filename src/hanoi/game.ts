import { Tower } from "./tower";

export class HanoiGame {

    towers: Tower[];

    constructor(numTowers: number, numDisks: number) {
        this.towers = Array.from({ length: numTowers }, () => [] as Tower);

        // Initialize first tower with disks in descending order
        this.towers[0] = Array.from({ length: numDisks }, (_, i) => ({ size: i + 1 })).sort((a, b) => b.size - a.size);
    }

    canMove(from: number, to: number): boolean {
        const fromTower = this.towers[from];
        const toTower = this.towers[to];

        if (fromTower.length === 0) {
            return false; // No disk to move
        }
        const movingDisc = fromTower[fromTower.length - 1];
        const topToDisc = toTower[toTower.length - 1];
        return !topToDisc || movingDisc.size < topToDisc.size;
    }

    move(from: number, to: number): HanoiGame {
        if (this.canMove(from, to)) {
            const disc = this.topDiscAt(from)!;
            this.towers[to].push(disc);
            this.towers[from].pop();
        }
        return this;
    }

    topDiscAt(towerIndex: number) {
        const tower = this.towers[towerIndex];
        return tower.length > 0 ? tower[tower.length - 1] : null;
    }
}