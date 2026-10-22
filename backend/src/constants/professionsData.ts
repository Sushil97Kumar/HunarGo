/**
 * Master List of Professions and Service Categories
 * Single source of truth for both Worker Signup & Worker Professions & Services Page.
 */

export interface MasterProfessionItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  category: string;
  categoryId?: string;
}

export interface MasterCategory {
  id: string;
  title: string;
  icon: string;
  items: MasterProfessionItem[];
}

export const MASTER_PROFESSION_CATEGORIES: MasterCategory[] = [
  {
    id: 'home_repair',
    title: 'Home Repair',
    icon: '🏠',
    items: [
      { id: 'plumber', title: 'Plumber', icon: '🔧', color: '#EBF3FF', category: 'Home Repair', categoryId: 'home_repair' },
      { id: 'electrician', title: 'Electrician', icon: '⚡', color: '#FEF9C3', category: 'Home Repair', categoryId: 'home_repair' },
      { id: 'carpenter', title: 'Carpenter', icon: '🔨', color: '#FFEDD5', category: 'Home Repair', categoryId: 'home_repair' },
      { id: 'painter', title: 'Painter', icon: '🎨', color: '#FCE7F3', category: 'Home Repair', categoryId: 'home_repair' },
      { id: 'mason', title: 'Mason', icon: '🧱', color: '#F3E8FF', category: 'Home Repair', categoryId: 'home_repair' },
      { id: 'technician', title: 'Technician', icon: '🧰', color: '#DCFCE7', category: 'Home Repair', categoryId: 'home_repair' },
    ],
  },
  {
    id: 'appliances',
    title: 'Appliances',
    icon: '❄️',
    items: [
      { id: 'ac_repair', title: 'AC Repair', icon: '❄️', color: '#CCFBF1', category: 'Appliances', categoryId: 'appliances' },
    ],
  },
  {
    id: 'vehicle_services',
    title: 'Vehicle Services',
    icon: '🚗',
    items: [
      { id: 'car_mechanic', title: 'Car Mechanic', icon: '🚗', color: '#E0F2FE', category: 'Vehicle Services', categoryId: 'vehicle_services' },
      { id: 'bike_mechanic', title: 'Bike Mechanic', icon: '🏍️', color: '#F3E8FF', category: 'Vehicle Services', categoryId: 'vehicle_services' },
    ],
  },
  {
    id: 'personal_beauty',
    title: 'Personal & Beauty',
    icon: '👩',
    items: [
      { id: 'barber', title: 'Barber', icon: '✂️', color: '#FCE7F3', category: 'Personal & Beauty', categoryId: 'personal_beauty' },
      { id: 'hair_stylist', title: 'Hair Style', icon: '💇', color: '#F3E8FF', category: 'Personal & Beauty', categoryId: 'personal_beauty' },
      { id: 'makeup_artist', title: 'Makeup Artist', icon: '💄', color: '#FFE4E6', category: 'Personal & Beauty', categoryId: 'personal_beauty' },
      { id: 'beautician', title: 'Beautician', icon: '💆', color: '#DCFCE7', category: 'Personal & Beauty', categoryId: 'personal_beauty' },
      { id: 'massage', title: 'Massage', icon: '👐', color: '#FFEDD5', category: 'Personal & Beauty', categoryId: 'personal_beauty' },
    ],
  },
  {
    id: 'cleaning',
    title: 'Cleaning',
    icon: '🧹',
    items: [
      { id: 'bathroom_cleaning', title: 'Bathroom Cleaning', icon: '🚽', color: '#E0F2FE', category: 'Cleaning', categoryId: 'cleaning' },
      { id: 'home_cleaning', title: 'Home Cleaning', icon: '🧹', color: '#DCFCE7', category: 'Cleaning', categoryId: 'cleaning' },
      { id: 'home_help', title: 'Home Help / Maid', icon: '👩‍🍳', color: '#FEF9C3', category: 'Cleaning', categoryId: 'cleaning' },
    ],
  },
  {
    id: 'outdoor_labour',
    title: 'Outdoor & Labour',
    icon: '🍂',
    items: [
      { id: 'gardener', title: 'Gardener', icon: '🌱', color: '#DCFCE7', category: 'Outdoor & Labour', categoryId: 'outdoor_labour' },
      { id: 'farm_labour', title: 'Farm Labour', icon: '🧑‍🌾', color: '#FEF9C3', category: 'Outdoor & Labour', categoryId: 'outdoor_labour' },
      { id: 'construction_labour', title: 'Construction Labour', icon: '👷', color: '#F3E8FF', category: 'Outdoor & Labour', categoryId: 'outdoor_labour' },
      { id: 'loading_unloading', title: 'Loading / Unloading', icon: '📦', color: '#E0F2FE', category: 'Outdoor & Labour', categoryId: 'outdoor_labour' },
      { id: 'daily_labour', title: 'Daily Labour', icon: '🧑‍🔧', color: '#FFE4E6', category: 'Outdoor & Labour', categoryId: 'outdoor_labour' },
    ],
  },
];

export const ALL_MASTER_PROFESSIONS: MasterProfessionItem[] = MASTER_PROFESSION_CATEGORIES.flatMap(
  (category) => category.items
);
