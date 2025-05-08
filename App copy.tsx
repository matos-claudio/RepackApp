// Home.js
import * as React from 'react';
import {Text} from 'react-native';

const StudentSide = React.lazy(
  () => import(/* webpackChunkName: "student" */ './src/screens/student.tsx'),
);

const TeacherSide = React.lazy(
  () => import(/* webpackChunkName: "teacher" */ './src/screens/teacher.tsx'),
);

export function App({user}) {
  // const Side = React.useMemo(
  //   () =>
  //     user.role === 'student' ? (
  //       <StudentSide user={user} />
  //     ) : (
  //       <TeacherSide user={user} />
  //     ),
  //   [user],
  // );

  return (
    <React.Suspense fallback={<Text>Loading...</Text>}>
      {user.role === 'student' ? (
        <StudentSide user={user} />
      ) : (
        <TeacherSide user={user} />
      )}
    </React.Suspense>
  );
}
