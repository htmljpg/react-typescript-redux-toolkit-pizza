import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import Cart from './assets/pages/Cart';
import Error from './assets/pages/Error';
import Layout from './assets/layout/Layout';
import Product from './components/Product';
import axios from 'axios';
import { PREFIX } from './helpers/api';
import AuthLayout from './assets/layout/Auth/AuthLayout';
import Login from './assets/pages/Login';
import Register from './assets/pages/Register';
import RequireAuth from './helpers/RequireAuth';
import { Provider } from 'react-redux';
import store from './store';
import Success from './assets/pages/Success';


const Menu = lazy(() => import('./assets/pages/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Layout /></RequireAuth>,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Загрузка....</>}><Menu /></Suspense>
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/success',
				element: <Success />
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <>Error</>,
				loader: async ({ params }) => {
					return defer({
						data: axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
					});

					// const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					// return data;
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
]);

function App() {
	return (
		<>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</>
	);
}

export default App;
