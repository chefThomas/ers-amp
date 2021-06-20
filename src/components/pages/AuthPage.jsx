import { Transition } from '@headlessui/react';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import Modal from '../Modal';
import Page from '../Page';
import ConfirmSignupForm from '../ConfirmSignupForm';
import { MessageContext } from '../../context/MessageContext';

const AuthPage = () => {
  const { user, signup, confirm, login } = useContext(UserContext);
  const { handleSetMessage } = useContext(MessageContext);

  const [username, setUsername] = useState(null);
  const [showCredentials, setShowCredentials] = useState(false);
  const [isShowing] = useState(true);
  const [form, setForm] = useState('login');

  const history = useHistory();

  // for animation
  useEffect(() => {
    fadeInCredentials();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      if (user.type === 'MANAGER') {
        history.push('/manager');
      }

      if (user.type === 'EMPLOYEE') {
        history.push(`/employee/${user.username}`);
      }
    }
  }, [user]);

  async function handleSignup(formData) {
    // extract username for next step of confirmation
    const { username, email } = formData;
    setUsername(username);

    const result = await signup(formData);
    if (result) {
      setForm('confirm');
      handleSetMessage(
        'info',
        `Confirmation code has been emailed to ${email}`
      );
    }
  }

  async function handleConfirm(formData) {
    const result = await confirm(username, formData);
    if (result) {
      setForm('login');
    }
  }

  async function handleLogin(formData) {
    const user = await login(formData);
    if (user) {
      if (user.type === 'EMPLOYEE') {
        history.push(`/employee/${user.username}`);
      } else {
        history.push('/manager');
      }
    }
  }

  function fadeInCredentials() {
    setTimeout(() => {
      setShowCredentials(true);
    }, 1000);
  }

  const demoCredentials = [
    'Manager',
    'Username: tom',
    'Password: a3soprox!',
    '------',
    'Employee1',
    'Username: sophie',
    'Password: fakepa$$',
    '------',
    'Employee2',
    'Username: george',
    'Password: fakepa$$!',
  ];

  return (
    <Page className='bg-gray-200'>
      <div className='ml-auto'>
        {showCredentials && (
          <Transition
            appear={true}
            show={showCredentials}
            enter='transition-opacity duration-1000'
            enterTo='opacity-100'
            enterFrom='opacity-0'
          >
            <Modal
              title='Demo user credentials'
              text={demoCredentials}
              callback={() => setShowCredentials(false)}
            />
          </Transition>
        )}
      </div>

      <Transition
        appear={true}
        show={isShowing}
        enter='transition-opacity duration-5000'
        enterTo='opacity-100'
        enterFrom='opacity-0'
      >
        <Transition.Child
          enter='transition ease-in-out duration-1000 transform'
          enterFrom='translate-y-full'
          enterTo='translate-y-0'
        >
          <div className='flex flex-col text-gray-800 justify-center  pt-36 pb-10'>
            <h2 className='mx-auto text-6xl font-mono tracking-widest text-gray-700	title-shadow'>
              ERS
            </h2>
            <h1 className='mx-auto uppercase'>Employee Reimbursement System</h1>
          </div>
        </Transition.Child>
      </Transition>
      <Transition
        appear={true}
        show={isShowing}
        enter='transition-opacity duration-1000'
        enterTo='opacity-100'
        enterFrom='opacity-30'
      >
        <Transition.Child
          enter='transition ease-in-out duration-1000 transform'
          enterFrom='translate-y-40'
          enterTo='translate-y-0'
        >
          {form === 'signup' ? (
            <SignupForm signup={handleSignup} setDisplayForm={setForm} />
          ) : form === 'confirm' ? (
            <ConfirmSignupForm confirm={handleConfirm} setFormView={setForm} />
          ) : (
            <LoginForm login={handleLogin} setDisplayForm={setForm} />
          )}
        </Transition.Child>
      </Transition>
    </Page>
  );
};

export default AuthPage;
