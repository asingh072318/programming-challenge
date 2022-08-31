import axios from "axios";


type Response = {
    response: [],
}

export default async function get_information(){
    try {
        // 👇️ const data: GetUsersResponse
        const { data } = await axios.get<Response>(
          'http://0.0.0.0:8000/movements/information',
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );
    
        console.log(JSON.stringify(data, null, 4));
    
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
}