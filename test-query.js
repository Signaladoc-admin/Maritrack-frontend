const { QueryClient } = require('@tanstack/react-query');
const queryClient = new QueryClient();
queryClient.fetchQuery({
  queryKey: ['test'],
  queryFn: () => undefined
}).then(console.log).catch(console.error);
