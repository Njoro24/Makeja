// src/services/user.js


let mockUser = {
  id: 'user123',
  name: 'Marvin Mango',
  email: 'marvinke2001@gmail.com',
  gender: 'Male',
  roomPreference: 'Single',
  avatarUrl: '/assets/images/default-avatar.png',
};


export async function getUserProfile() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser);
    }, 500); 
  });
}


export async function updateUserProfile(updatedData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUser = { ...mockUser, ...updatedData };
      resolve(mockUser);
    }, 500);
  });
}


export async function changePassword(oldPassword, newPassword) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (oldPassword === 'test123') {
        resolve({ success: true });
      } else {
        reject({ error: 'Incorrect current password' });
      }
    }, 500);
  });
}
