export enum Page {
    Home = 'home',
    Adopt = 'adopt',
    SubmitPet = 'submit-pet',
    Guides = 'guides',
    Admin = 'admin'
}

export enum ModalType {
    AdopterRegister = 'adopter-register',
    ShelterRegister = 'shelter-register',
    Login = 'login',
    AdminLogin = 'admin-login',
    AdoptionApplication = 'adoption-application'
}

export enum UserRole {
    Adopter = 'adopter',
    Shelter = 'shelter',
    Admin = 'admin'
}

export enum ShelterSubRole {
    Shelter = 'shelter',
    PetGiver = 'pet_giver'
}

export interface User {
    _id: string;
    name: string;
    email: string;
    address?: string;
    phone?: string;
    role: UserRole;
    subrole?: ShelterSubRole;
}

export interface Pet {
    _id: string;
    name: string;
    type: 'dog' | 'cat' | 'bird';
    breed: string;
    age: string;
    health: string;
    behavior: string;
    image: string;
    status: 'available' | 'adopted';
    shelterId: string;
}

export interface Application {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    reason: string;
    petId: Pet | string; // Can be populated
    adopterId: string;
    shelterId: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

// For AuthContext
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}
