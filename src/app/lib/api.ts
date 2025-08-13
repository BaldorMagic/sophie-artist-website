import directus from "./directus";

export async function getHeroContent(): Promise<HeroSection | null>{
    try {
        const res = await directus.request(
            directus.items('hero_section').readByQuery({
                limit: 1,
                fields: ['title', 'description', 'background']
            })
        );
        return res.data?.[0] || null;
    } catch (error) {
        console.error('Error fetching hero content:', error)
        return null;
    }
}

export async function getPaintings(): Promise<Painting[]> {
    try {
        const res = await directus.request(
            directus.items('paintings').readByQuery({
                fields: ['id', 'status', 'title', 'painting', 'year', 'medium'],
                sort: ['-year'],
                filter: {
                    status: {
                        _eq: 'showcase'
                    }
                }
            })
        );
        return res.data || []
    } catch (error) {
        console.error('Error fetching paintings:', error);
        return [];
    }
}

export async function getAboutContent(): Promise<AboutSection | null>{
    try {
        const res = await directus.request(
            directus.items('about_section').readByQuery({
                limit: 1,
                fields: ['image', 'description']
            })
        );
        return res.data?.[0] || null;
    } catch (error) {
        console.error('Error fetching about content:', error)
        return null;
    }
}