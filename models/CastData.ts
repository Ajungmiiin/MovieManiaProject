// adult: false,
//     gender: 0,
//     id: 78374,
//     known_for_department: 'Production',
//     name: 'Hironori Aihara',
//     original_name: 'Hironori Aihara',
//     popularity: 0.72,
//     profile_path: null,
//     credit_id: '6128953f0d9f5a0089f93bed',
//     department: 'Production',
//     job: 'Co-Executive Producer'

interface CastData {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job?: string;
  character?: string;
}
