export interface IDTokenJwtData {
  type: string; // 'JWT'
  alg: string; // 'HS256'
}

export interface IDTokenPayload {
  iss: string; // issuer
  sub: string; // subject
  aud: string; // audience
  exp: Date; // expiration time
  iat: Date; // issued at
  jti: string; // JWT ID
}

export interface IDToken {
  header: IDTokenJwtData;
  payload: IDTokenPayload;
  signature: Buffer;
}

function extractJSONObjectFromBuffer(buf: Buffer, offset) {
  let depth = 0;
  let start = -1;
  let i = offset;
  for (; i < buf.length; i++) {
    const char = String.fromCharCode(buf[i]);
    if (char === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0) {
        // Slices the buffer to include the complete JSON object.
        return { objectBuffer: buf.slice(start, i + 1), endIndex: i + 1 };
      }
    }
  }
  throw new Error("Bad JSON in buffer, mate!");
}

/**
 * 
 * @param token - The ID token to decode
 */
export function decodeIdToken(jwtBuffer: Buffer) {
  // Extract header JSON from the buffer.
  const headerPart = extractJSONObjectFromBuffer(jwtBuffer, 0);
  let header;
  try {
    header = JSON.parse(headerPart.objectBuffer.toString('utf8'));
  } catch (err) {
    throw new Error("Failed to parse header JSON");
  }

  // Extract payload JSON from the remainder of the buffer.
  const payloadPart = extractJSONObjectFromBuffer(jwtBuffer, headerPart.endIndex);
  let payload;
  try {
    payload = JSON.parse(payloadPart.objectBuffer.toString('utf8'));
  } catch (err) {
    throw new Error("Failed to parse payload JSON");
  }

  // The rest of the buffer is the raw signature.
  const signatureBuffer = jwtBuffer.slice(payloadPart.endIndex);
  
  return {
    header: {
      type: header.typ,
      alg: header.alg,
    },
    payload: {
      ...payload,
      exp: new Date(payload.exp * 1000),
      iat: new Date(payload.iat * 1000),
    },
    signature: signatureBuffer
  };
}
