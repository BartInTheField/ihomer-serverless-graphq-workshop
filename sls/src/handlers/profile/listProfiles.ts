import {ProfileService} from '../../services/profile.service';

export const handler = async ({ info: {selectionSetList}}) => {
    const profiles = await ProfileService.list();

    for (const profile of profiles) {
        await ProfileService.enrich(profile, selectionSetList);
    }

    return profiles;
};
