import {ProfileService} from '../../services/profile.service';

export const handler = async () => {
    const profiles = await ProfileService.list();

    return profiles;
};
