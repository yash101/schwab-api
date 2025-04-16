import { decodeIdToken } from '../../lib/auth/idtoken';

describe('decodeIdToken', () => {
  it('should decode a valid ID token and return the header, payload, and signature', () => {
    const token = Buffer.from(
      JSON.stringify({ alg: 'HS256', typ: 'JWT' }) +
        JSON.stringify({
          iss: 'issuer',
          sub: 'subject',
          aud: 'audience',
          exp: Math.floor(Date.now() / 1000) + 3600,
          iat: Math.floor(Date.now() / 1000),
          jti: 'jwt-id',
        }) +
        'signature'
    );

    const result = decodeIdToken(token);

    expect(result.header).toEqual({ alg: 'HS256', type: 'JWT' });
    expect(result.payload.iss).toBe('issuer');
    expect(result.payload.sub).toBe('subject');
    expect(result.payload.aud).toBe('audience');
    expect(result.payload.exp).toBeInstanceOf(Date);
    expect(result.payload.iat).toBeInstanceOf(Date);
    expect(result.payload.jti).toBe('jwt-id');
    expect(result.signature).toBeInstanceOf(Buffer);
  });

  it('should throw an error if the token is invalid or malformed', () => {
    const invalidToken = Buffer.from('invalid-token');

    expect(() => decodeIdToken(invalidToken)).toThrow();
  });

  it('should handle tokens with missing components gracefully', () => {
    const incompleteToken = Buffer.from(
      JSON.stringify({ alg: 'HS256', type: 'JWT' }) + 'signature'
    );

    expect(() => decodeIdToken(incompleteToken)).toThrow();
  });

  it('should handle a proper token', () => {
    const token = Buffer.from('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9eyJzdWIiOiJhYmNkIiwiYXVkIjoiZWZnaCIsImlzcyI6InVybjovL2FwaS5zY2h3YWJhcGkuY29tIiwiZXhwIjoxNzQ0NjY4NzI4LCJpYXQiOjE3NDQ2NjUxMjgsImp0aSI6ImprbG0ifQws77+977+9RBF3J2ZsK82e77+9HEsN77+9QWDvv70h77+9AO+/vUU4fUpU77+9', 'base64');
    const result = decodeIdToken(token);
    expect(result.header).toEqual({ alg: 'HS256', type: 'JWT' });
    expect(result.payload.sub).toBe('abcd');
    expect(result.payload.aud).toBe('efgh');
    expect(result.payload.iss).toBe('urn://api.schwabapi.com');
    expect(result.payload.exp).toEqual(new Date(1744668728 * 1000));
    expect(result.payload.iat).toEqual(new Date(1744665128 * 1000));
    expect(result.payload.jti).toBe('jklm');
  })
});