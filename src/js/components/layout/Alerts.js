import useCustomContext from '@hooks/useCustomContext';

const Alerts = () => {

   const alertContext = useCustomContext();

   const { alerts } = alertContext;
   const hasAlert = alerts.length > 0;

   return (
      hasAlert && alerts.map(alert => <div key={alert.id}>{alert.msg}</div>)
   );
};

export default Alerts;