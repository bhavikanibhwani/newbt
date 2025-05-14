// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { BarChart, LineChart, Users, Activity } from "lucide-react";

// const Dashboard = () => {
//   const analytics = [
//     { title: "Total Users", value: "1,245", icon: <Users className="w-6 h-6 text-blue-500" /> },
//     { title: "Active Sessions", value: "342", icon: <Activity className="w-6 h-6 text-green-500" /> },
//     { title: "Revenue", value: "$12,400", icon: <BarChart className="w-6 h-6 text-yellow-500" /> },
//     { title: "New Signups", value: "56", icon: <LineChart className="w-6 h-6 text-red-500" /> },
//   ];

//   const recentActivity = [
//     { id: 1, user: "John Doe", action: "Logged in", time: "5 mins ago" },
//     { id: 2, user: "Jane Smith", action: "Made a purchase", time: "30 mins ago" },
//     { id: 3, user: "Alice Johnson", action: "Updated profile", time: "1 hour ago" },
//   ];

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         {analytics.map((item, index) => (
//           <Card key={index} className="shadow-md">
//             <CardHeader className="flex items-center gap-2">
//               {item.icon}
//               <CardTitle>{item.title}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-xl font-semibold">{item.value}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
      
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>User</TableHead>
//               <TableHead>Action</TableHead>
//               <TableHead>Time</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {recentActivity.map((activity) => (
//               <TableRow key={activity.id}>
//                 <TableCell>{activity.user}</TableCell>
//                 <TableCell>{activity.action}</TableCell>
//                 <TableCell>{activity.time}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Home, User, Settings, BarChart as ChartIcon } from "lucide-react";

const Dashboard = () => {
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 700 },
    { name: "May", value: 600 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
            <Home size={20} /> <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
            <ChartIcon size={20} /> <span>Analytics</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
            <User size={20} /> <span>Profile</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
            <Settings size={20} /> <span>Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow">Logout</button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-2xl font-bold text-blue-500">1,245</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">Active Users</h3>
            <p className="text-2xl font-bold text-green-500">845</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold">New Signups</h3>
            <p className="text-2xl font-bold text-red-500">67</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;