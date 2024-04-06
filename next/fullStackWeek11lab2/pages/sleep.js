import React from 'react';
import Layout from '../components/layout/Layout';
import DataList from '../components/notes/DataList';
import DataItem from '../components/notes/DataItem';

function Sleep() {
  return (
    <Layout>
      <h1>Sleep Data</h1>
      <DataList />
    </Layout>
  );
}

export default Sleep;