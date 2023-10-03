// Define an interface for the object
export interface UserProfile {
    name: string;
    surname: string;
    email: string;
    phone_number: string;
    experiences: Experience[];
    educations: Education[];
    image: string;
    about_me: string;
}

export interface Experience {
    position: string;
    employer: string;
    start_date: string;
    due_date: string;
    description: string;
}

export interface Education {
    institute: string;
    degree_id: number;
    due_date: string;
    description: string;
}
