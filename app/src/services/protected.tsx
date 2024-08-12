import { GetServerSideProps } from 'next';


export const getServerSideProps: GetServerSideProps = async (context: any) => {
    var cookie = require('cookie');
    const { req } = context;
    const cookies = cookie.parse(req.headers.cookie || '');

    if (!cookies.token) {
        // Redirect to login page if no token is found
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    // Fetch data with the token if needed
    // const response = await fetchYourProtectedResource(cookies.token);

    return {
        props: {}, // pass any props to your page component if needed
    };
};

const ProtectedPage = () => {
    return <div>Protected Content</div>;
};

export default ProtectedPage;
