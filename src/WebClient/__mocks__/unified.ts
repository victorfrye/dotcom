export const unified = jest.fn(() => ({
  use: jest.fn().mockReturnThis(),
  processSync: jest.fn(),
}));

export default { unified };
