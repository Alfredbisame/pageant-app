import { HydratedDocument } from 'mongoose';
export declare class HeroSection {
    backgroundImage: string;
    badgeText: string;
    headline: string;
    subtitle: string;
}
export declare const HeroSectionSchema: import("mongoose").Schema<HeroSection, import("mongoose").Model<HeroSection, any, any, any, any, any, HeroSection>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HeroSection, import("mongoose").Document<unknown, {}, HeroSection, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<HeroSection & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    backgroundImage?: import("mongoose").SchemaDefinitionProperty<string, HeroSection, import("mongoose").Document<unknown, {}, HeroSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HeroSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    badgeText?: import("mongoose").SchemaDefinitionProperty<string, HeroSection, import("mongoose").Document<unknown, {}, HeroSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HeroSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    headline?: import("mongoose").SchemaDefinitionProperty<string, HeroSection, import("mongoose").Document<unknown, {}, HeroSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HeroSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subtitle?: import("mongoose").SchemaDefinitionProperty<string, HeroSection, import("mongoose").Document<unknown, {}, HeroSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<HeroSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, HeroSection>;
export declare class MissionVisionItem {
    icon: string;
    title: string;
    body: string;
}
export declare const MissionVisionItemSchema: import("mongoose").Schema<MissionVisionItem, import("mongoose").Model<MissionVisionItem, any, any, any, any, any, MissionVisionItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MissionVisionItem, import("mongoose").Document<unknown, {}, MissionVisionItem, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<MissionVisionItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    icon?: import("mongoose").SchemaDefinitionProperty<string, MissionVisionItem, import("mongoose").Document<unknown, {}, MissionVisionItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MissionVisionItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, MissionVisionItem, import("mongoose").Document<unknown, {}, MissionVisionItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MissionVisionItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    body?: import("mongoose").SchemaDefinitionProperty<string, MissionVisionItem, import("mongoose").Document<unknown, {}, MissionVisionItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MissionVisionItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, MissionVisionItem>;
export declare class ImpactStat {
    value: string;
    label: string;
    description: string;
}
export declare const ImpactStatSchema: import("mongoose").Schema<ImpactStat, import("mongoose").Model<ImpactStat, any, any, any, any, any, ImpactStat>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ImpactStat, import("mongoose").Document<unknown, {}, ImpactStat, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ImpactStat & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    value?: import("mongoose").SchemaDefinitionProperty<string, ImpactStat, import("mongoose").Document<unknown, {}, ImpactStat, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ImpactStat & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    label?: import("mongoose").SchemaDefinitionProperty<string, ImpactStat, import("mongoose").Document<unknown, {}, ImpactStat, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ImpactStat & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, ImpactStat, import("mongoose").Document<unknown, {}, ImpactStat, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ImpactStat & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ImpactStat>;
export declare class TimelineItem {
    year: string;
    title: string;
    description: string;
    side: string;
    accent: string;
    sortOrder: number;
}
export declare const TimelineItemSchema: import("mongoose").Schema<TimelineItem, import("mongoose").Model<TimelineItem, any, any, any, any, any, TimelineItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TimelineItem, import("mongoose").Document<unknown, {}, TimelineItem, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TimelineItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    year?: import("mongoose").SchemaDefinitionProperty<string, TimelineItem, import("mongoose").Document<unknown, {}, TimelineItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimelineItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, TimelineItem, import("mongoose").Document<unknown, {}, TimelineItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimelineItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, TimelineItem, import("mongoose").Document<unknown, {}, TimelineItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimelineItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    side?: import("mongoose").SchemaDefinitionProperty<string, TimelineItem, import("mongoose").Document<unknown, {}, TimelineItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimelineItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    accent?: import("mongoose").SchemaDefinitionProperty<string, TimelineItem, import("mongoose").Document<unknown, {}, TimelineItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimelineItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sortOrder?: import("mongoose").SchemaDefinitionProperty<number, TimelineItem, import("mongoose").Document<unknown, {}, TimelineItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimelineItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TimelineItem>;
export declare class TeamMember {
    name: string;
    role: string;
    image: string;
    sortOrder: number;
}
export declare const TeamMemberSchema: import("mongoose").Schema<TeamMember, import("mongoose").Model<TeamMember, any, any, any, any, any, TeamMember>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TeamMember, import("mongoose").Document<unknown, {}, TeamMember, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TeamMember & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, TeamMember, import("mongoose").Document<unknown, {}, TeamMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<string, TeamMember, import("mongoose").Document<unknown, {}, TeamMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    image?: import("mongoose").SchemaDefinitionProperty<string, TeamMember, import("mongoose").Document<unknown, {}, TeamMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sortOrder?: import("mongoose").SchemaDefinitionProperty<number, TeamMember, import("mongoose").Document<unknown, {}, TeamMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TeamMember>;
export declare class TeamSection {
    heading: string;
    subtitle: string;
    members: TeamMember[];
}
export declare const TeamSectionSchema: import("mongoose").Schema<TeamSection, import("mongoose").Model<TeamSection, any, any, any, any, any, TeamSection>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TeamSection, import("mongoose").Document<unknown, {}, TeamSection, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TeamSection & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    heading?: import("mongoose").SchemaDefinitionProperty<string, TeamSection, import("mongoose").Document<unknown, {}, TeamSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subtitle?: import("mongoose").SchemaDefinitionProperty<string, TeamSection, import("mongoose").Document<unknown, {}, TeamSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    members?: import("mongoose").SchemaDefinitionProperty<TeamMember[], TeamSection, import("mongoose").Document<unknown, {}, TeamSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TeamSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TeamSection>;
export declare class TimelineSection {
    heading: string;
    subtitle: string;
    items: TimelineItem[];
}
export declare const TimelineSectionSchema: import("mongoose").Schema<TimelineSection, import("mongoose").Model<TimelineSection, any, any, any, any, any, TimelineSection>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TimelineSection, import("mongoose").Document<unknown, {}, TimelineSection, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<TimelineSection & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    heading?: import("mongoose").SchemaDefinitionProperty<string, TimelineSection, import("mongoose").Document<unknown, {}, TimelineSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimelineSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subtitle?: import("mongoose").SchemaDefinitionProperty<string, TimelineSection, import("mongoose").Document<unknown, {}, TimelineSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimelineSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    items?: import("mongoose").SchemaDefinitionProperty<TimelineItem[], TimelineSection, import("mongoose").Document<unknown, {}, TimelineSection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<TimelineSection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, TimelineSection>;
export type AboutPageDocument = HydratedDocument<AboutPage>;
export declare class AboutPage {
    hero: HeroSection;
    missionVision: MissionVisionItem[];
    impactStats: ImpactStat[];
    timeline: TimelineSection;
    team: TeamSection;
    createdAt: Date;
    updatedAt: Date;
}
export declare const AboutPageSchema: import("mongoose").Schema<AboutPage, import("mongoose").Model<AboutPage, any, any, any, any, any, AboutPage>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AboutPage, import("mongoose").Document<unknown, {}, AboutPage, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    hero?: import("mongoose").SchemaDefinitionProperty<HeroSection, AboutPage, import("mongoose").Document<unknown, {}, AboutPage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    missionVision?: import("mongoose").SchemaDefinitionProperty<MissionVisionItem[], AboutPage, import("mongoose").Document<unknown, {}, AboutPage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    impactStats?: import("mongoose").SchemaDefinitionProperty<ImpactStat[], AboutPage, import("mongoose").Document<unknown, {}, AboutPage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    timeline?: import("mongoose").SchemaDefinitionProperty<TimelineSection, AboutPage, import("mongoose").Document<unknown, {}, AboutPage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    team?: import("mongoose").SchemaDefinitionProperty<TeamSection, AboutPage, import("mongoose").Document<unknown, {}, AboutPage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, AboutPage, import("mongoose").Document<unknown, {}, AboutPage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, AboutPage, import("mongoose").Document<unknown, {}, AboutPage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AboutPage & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, AboutPage>;
