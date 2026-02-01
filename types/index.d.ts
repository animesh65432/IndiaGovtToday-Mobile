export type LanguagesTypes = {
    id: number;
    name: string;
}

export type DefaultLanguagesTypes = {
    id: number,
    name: string,
    value: string
}

export type OptionsforLanguagesTypes = {
    label: string;
    value: string;
}

export type AnnouncementType = {
    title: string,
    description: string,
    state: string,
    category: string,
    department: string,
    date: string,
    announcementId: string
}

export type AnnouncementsResponse = {
    data: Announcement[],
    languageCode: string,
    pagination: {
        page: number,
        totalPages: number,
        totalCount: number,
        pageSize: number
    }
}

type SummarySection = {
    type: "summary";
    heading: string;
    content: string;
};

type DetailsSection = {
    type: "details";
    heading: string;
    content: string;
};

type KeyPointsSection = {
    type: "keypoints";
    heading: string;
    points: string[];
};

export type SectionTypes =
    | SummarySection
    | DetailsSection
    | KeyPointsSection;

export type ShowAnnouncementTypes = {
    announcementId: string,
    source_link: string,
    state: string,
    title: string,
    date: string,
    category: string,
    department: string,
    sections: SectionTypes[]

}