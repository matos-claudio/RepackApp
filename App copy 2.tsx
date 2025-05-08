/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Script, ScriptManager} from '@callstack/repack/client';

const StudentSide = React.lazy(
  () => import(/* webpackChunkName: "student" */ './src/screens/student.tsx'),
);

const TeacherSide = React.lazy(
  () => import(/* webpackChunkName: "teacher" */ './src/screens/teacher.tsx'),
);

function App(): React.JSX.Element {
  const [RemoteComponent, setRemoteComponent] =
    React.useState<React.ComponentType | null>(null);
  const user = {
    role: 'teacher',
  };

  const loadRemote = async () => {
    await ScriptManager.shared.loadScript('homeModule'); // isso busca homeModule.bundle
    console.log('Script loaded');
    console.log('🔍 Verificando globalThis.__chunk__:', globalThis.__chunk__);
    const Component = globalThis.__chunk__['homeModule']?.Home;

    if (Component) {
      setRemoteComponent(() => Component);
    } else {
      console.error('⚠️ Módulo não carregado corretamente');
    }
  };

  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={loadRemote}>
          <Text>Carregar</Text>
        </TouchableOpacity>
        {RemoteComponent && <RemoteComponent />}
      </View>
      {/* {user.role === 'student' ? (
        <StudentSide user={user} />
      ) : (
        <TeacherSide user={user} />
      )} */}
    </React.Suspense>
  );
}

export default App;
