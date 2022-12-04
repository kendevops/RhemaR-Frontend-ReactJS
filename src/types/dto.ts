export type UserGender = "MALE" | "FEMALE";

export type UserDto = {
  address: string;
  altPhoneNumber: string;
  avatarUrl: string;
  campusId: string;
  createdAt: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  gender: UserGender;
  id: string;
  isAltPhoneNumberVerified: false;
  isEmailVerified: true;
  isPhoneNumberVerified: true;
  lastName: string;
  levelId: string;
  maritalStatus: string;
  middleName: string;
  nationality: string;
  password: string;
  phoneNumber: string;
  refreshToken: string;
  rolesIds: string[];
  twoFA: string;
  updatedAt: string;
  viewedNotificationsIds: [];
};
