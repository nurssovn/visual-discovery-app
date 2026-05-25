import { apiService } from './api';

describe('apiService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('getPins returns parsed json on success', async () => {
    const pins = [{ id: '1', title: 'Test' }];
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => pins,
    });

    const result = await apiService.getPins();
    expect(result).toEqual(pins);
    expect(global.fetch.mock.calls[0][0]).toContain('/pins');
  });

  it('createPin throws when server responds with error', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 });

    await expect(apiService.createPin({ title: 'X' })).rejects.toThrow();
  });

  it('deletePin calls DELETE endpoint', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    await apiService.deletePin('42');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/pins/42'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});
