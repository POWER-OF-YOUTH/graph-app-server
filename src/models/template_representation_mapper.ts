import { Driver } from 'neo4j-driver';
import TemplateRepresentation from './template_representation';

class TemplateRepresentationMapper {
    private readonly _driver: Driver;

    constructor(driver: Driver) {
        this._driver = driver;
    }

    get driver(): Driver {
        return this._driver;
    }

    all(): Array<TemplateRepresentation> {
        return [];
    }

    findByName(name: string): TemplateRepresentation | null {
        return null;
    }

    save(templateRepresentaion: TemplateRepresentation) {
        return;
    }
}