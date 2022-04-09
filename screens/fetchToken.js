export async function fetchToken({roomID, userID, role}) {
  const endPoint = 'https://prod-in.100ms.live/hmsapi/msteam.app.100ms.live/';

  const body = {
    room_id: roomID,
    user_id: userID,
    role: role,
  };

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const response = await fetch(`${endPoint}api/token`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  });

  try {
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("Can't get token");
  }
}
