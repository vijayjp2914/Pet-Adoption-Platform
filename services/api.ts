
import { Pet, User, Application, UserRole, ShelterSubRole } from '../types';

export const mockPets: Pet[] = [
  // FIX: Changed 'id' to '_id' to match Pet type.
  { _id: 'p1', name: 'Buddy', type: 'dog', breed: 'Golden Retriever', age: 'adult', health: 'Excellent', behavior: 'Friendly, playful', image: 'https://picsum.photos/id/237/400/300', status: 'available', shelterId: 's1' },
  // FIX: Changed 'id' to '_id' to match Pet type.
  { _id: 'p2', name: 'Lucy', type: 'dog', breed: 'Labrador', age: 'puppy', health: 'Good, vaccinated', behavior: 'Energetic', image: 'https://picsum.photos/id/1025/400/300', status: 'available', shelterId: 's1' },
  // FIX: Changed 'id' to '_id' to match Pet type.
  { _id: 'p3', name: 'Misty', type: 'cat', breed: 'Persian', age: 'senior', health: 'Needs daily medication', behavior: 'Calm, affectionate', image: 'https://picsum.photos/id/1074/400/300', status: 'available', shelterId: 's2' },
  // FIX: Changed 'id' to '_id' to match Pet type.
  { _id: 'p4', name: 'Max', type: 'dog', breed: 'German Shepherd', age: 'adult', health: 'Excellent', behavior: 'Loyal, protective', image: 'https://picsum.photos/id/1062/400/300', status: 'adopted', shelterId: 's2' },
  // FIX: Changed 'id' to '_id' to match Pet type.
  { _id: 'p5', name: 'Whiskers', type: 'cat', breed: 'Siamese', age: 'puppy', health: 'Good', behavior: 'Curious', image: 'https://picsum.photos/id/593/400/300', status: 'available', shelterId: 's1' },
  // FIX: Changed 'id' to '_id' to match Pet type.
  { _id: 'p6', name: 'Rocky', type: 'dog', breed: 'Boxer', age: 'adult', health: 'Excellent', behavior: 'High-energy, fun', image: 'https://picsum.photos/id/163/400/300', status: 'available', shelterId: 's2' }
];

export const mockUsers: User[] = [
  // FIX: Changed 'id' to '_id' to match User type.
  { _id: 'a1', name: 'John Doe', email: 'john@example.com', address: '123 Main St', phone: '555-1234', role: UserRole.Adopter },
  // FIX: Changed 'id' to '_id' to match User type.
  { _id: 's1', name: 'Happy Paws Shelter', email: 'shelter@example.com', address: '456 Oak Ave', phone: '555-5678', role: UserRole.Shelter, subrole: ShelterSubRole.Shelter },
  // FIX: Changed 'id' to '_id' to match User type.
  { _id: 's2', name: 'Jane Smith', email: 'jane@example.com', address: '789 Pine Ln', phone: '555-8765', role: UserRole.Shelter, subrole: ShelterSubRole.PetGiver }
];

export const mockApplications: Application[] = [
  // FIX: Changed 'id' to '_id' and removed 'petName' to match Application type.
  { _id: 'app1', name: 'Alice', email: 'alice@example.com', phone: '555-1111', address: '101 Maple Dr', reason: 'I have a big yard and love dogs.', petId: 'p2', status: 'Pending', shelterId: 's1', adopterId: 'a1' }
];
