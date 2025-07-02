import { useState } from 'react'

interface Role {
  id: number
  name: string
  description: string
  permissions: string[]
  userCount: number
}

function Roles() {
  const [roles, setRoles] = useState<Role[]>([
    { 
      id: 1, 
      name: 'Admin', 
      description: 'Full system access', 
      permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'], 
      userCount: 2 
    },
    { 
      id: 2, 
      name: 'Manager', 
      description: 'Department management access', 
      permissions: ['read', 'write', 'manage_department'], 
      userCount: 5 
    },
    { 
      id: 3, 
      name: 'User', 
      description: 'Basic system access', 
      permissions: ['read'], 
      userCount: 10 
    },
  ])
  
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentRole, setCurrentRole] = useState<Role | null>(null)
  
  const handleAddRole = () => {
    setShowAddModal(true)
    alert('Add Role button clicked! This would open a modal in a complete implementation.')
  }
  
  const handleEditRole = (role: Role) => {
    setCurrentRole(role)
    setShowEditModal(true)
    alert(`Edit button clicked for role: ${role.name}`)
  }
  
  const handleDeleteRole = (role: Role) => {
    setCurrentRole(role)
    setShowDeleteModal(true)
    alert(`Delete button clicked for role: ${role.name}`)
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleAddRole}
        >
          Add Role
        </button>
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <div key={role.id} className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{role.name}</h3>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {role.userCount} users
                </span>
              </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{role.description}</p>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <div className="mb-2">
                <h4 className="text-sm font-medium text-gray-500">Permissions:</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <span key={permission} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
                      {permission.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => handleEditRole(role)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => handleDeleteRole(role)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Roles