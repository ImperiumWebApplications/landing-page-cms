import { useLocation, useHistory } from 'react-router-dom';

export const useModelParam = () => {
  const location = useLocation();
  const history = useHistory();

  const params = new URLSearchParams(location.search);

  const model = params.get('model');
  const setModel = (model: string) => {
    params.set('model', model);
    history.push({ search: params.toString() });
  };

  return { model, setModel };
};
