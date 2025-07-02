import { useState } from 'react'

function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'sERP Inc.',
    email: 'admin@serp.com',
    language: 'en',
    timezone: 'UTC+7',
    dateFormat: 'DD/MM/YYYY',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    systemNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: 90, // days
    sessionTimeout: 30, // minutes
    loginAttempts: 5,
  })
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    accentColor: 'blue',
    fontSize: 'medium',
    sidebarPosition: 'left'
  })

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  
  const handleSaveGeneral = () => {
    alert('General settings saved!')
    // Here you would typically send the data to an API
    console.log('Saving general settings:', generalSettings)
  }
  
  const handleSaveNotifications = () => {
    alert('Notification settings saved!')
    console.log('Saving notification settings:', notificationSettings)
  }
  
  const handleSaveSecurity = () => {
    alert('Security settings saved!')
    console.log('Saving security settings:', securitySettings)
  }
  
  const handleSaveAppearance = () => {
    alert('Appearance settings saved!')
    console.log('Saving appearance settings:', appearanceSettings)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      
      <div className="mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => handleTabChange('general')}
              className={`${activeTab === 'general' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              General
            </button>
            <button
              onClick={() => handleTabChange('notifications')}
              className={`${activeTab === 'notifications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Notifications
            </button>
            <button
              onClick={() => handleTabChange('security')}
              className={`${activeTab === 'security' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Security
            </button>
            <button
              onClick={() => handleTabChange('appearance')}
              className={`${activeTab === 'appearance' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Appearance
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">General Settings</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Basic system configuration.</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                      Company name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company-name"
                        id="company-name"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={generalSettings.companyName}
                        onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={generalSettings.email}
                        onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                      Language
                    </label>
                    <div className="mt-1">
                      <select
                        id="language"
                        name="language"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={generalSettings.language}
                        onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
                      >
                        <option value="en">English</option>
                        <option value="id">Indonesian</option>
                        <option value="zh">Chinese</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                      Timezone
                    </label>
                    <div className="mt-1">
                      <select
                        id="timezone"
                        name="timezone"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={generalSettings.timezone}
                        onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                      >
                        <option value="UTC+7">UTC+7</option>
                        <option value="UTC+8">UTC+8</option>
                        <option value="UTC+9">UTC+9</option>
                        <option value="UTC+0">UTC+0</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="date-format" className="block text-sm font-medium text-gray-700">
                      Date Format
                    </label>
                    <div className="mt-1">
                      <select
                        id="date-format"
                        name="date-format"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={generalSettings.dateFormat}
                        onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSaveGeneral}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Notification Settings</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Configure how you receive notifications.</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-notifications" className="font-medium text-gray-700">Email notifications</label>
                      <p className="text-gray-500">Get notified via email for important updates.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="system-notifications"
                        name="system-notifications"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={notificationSettings.systemNotifications}
                        onChange={(e) => setNotificationSettings({...notificationSettings, systemNotifications: e.target.checked})}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="system-notifications" className="font-medium text-gray-700">System notifications</label>
                      <p className="text-gray-500">Receive in-app notifications.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="marketing-emails"
                        name="marketing-emails"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={notificationSettings.marketingEmails}
                        onChange={(e) => setNotificationSettings({...notificationSettings, marketingEmails: e.target.checked})}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="marketing-emails" className="font-medium text-gray-700">Marketing emails</label>
                      <p className="text-gray-500">Receive updates about new features and promotions.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="security-alerts"
                        name="security-alerts"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={notificationSettings.securityAlerts}
                        onChange={(e) => setNotificationSettings({...notificationSettings, securityAlerts: e.target.checked})}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="security-alerts" className="font-medium text-gray-700">Security alerts</label>
                      <p className="text-gray-500">Get notified about important security events.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSaveNotifications}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Security Settings</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Configure security options for your account.</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="two-factor-auth"
                        name="two-factor-auth"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="two-factor-auth" className="font-medium text-gray-700">Two-factor authentication</label>
                      <p className="text-gray-500">Add an extra layer of security to your account.</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password-expiry" className="block text-sm font-medium text-gray-700">
                      Password expiry (days)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="password-expiry"
                        id="password-expiry"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={securitySettings.passwordExpiry}
                        onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value)})}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Number of days before password expires. Set to 0 to disable.</p>
                  </div>

                  <div>
                    <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-700">
                      Session timeout (minutes)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="session-timeout"
                        id="session-timeout"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Automatically log out after inactivity period.</p>
                  </div>

                  <div>
                    <label htmlFor="login-attempts" className="block text-sm font-medium text-gray-700">
                      Maximum login attempts
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="login-attempts"
                        id="login-attempts"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={securitySettings.loginAttempts}
                        onChange={(e) => setSecuritySettings({...securitySettings, loginAttempts: parseInt(e.target.value)})}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Number of failed login attempts before account is locked.</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSaveSecurity}
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Appearance Settings</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Customize the look and feel of the application.</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Theme</label>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer bg-white shadow-sm hover:border-blue-500">
                        <div className="w-full h-10 bg-white border border-gray-200 rounded-md"></div>
                        <div className="text-sm font-medium">Light</div>
                      </div>
                      <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer bg-gray-100 hover:border-blue-500">
                        <div className="w-full h-10 bg-gray-800 rounded-md"></div>
                        <div className="text-sm font-medium">Dark</div>
                      </div>
                      <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer bg-gray-100 hover:border-blue-500">
                        <div className="w-full h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md"></div>
                        <div className="text-sm font-medium">Custom</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Accent Color</label>
                    <div className="mt-4 grid grid-cols-6 gap-4">
                      <div className="h-8 w-8 bg-blue-500 rounded-full cursor-pointer ring-2 ring-offset-2 ring-blue-500"></div>
                      <div className="h-8 w-8 bg-green-500 rounded-full cursor-pointer"></div>
                      <div className="h-8 w-8 bg-red-500 rounded-full cursor-pointer"></div>
                      <div className="h-8 w-8 bg-purple-500 rounded-full cursor-pointer"></div>
                      <div className="h-8 w-8 bg-yellow-500 rounded-full cursor-pointer"></div>
                      <div className="h-8 w-8 bg-pink-500 rounded-full cursor-pointer"></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Font Size</label>
                    <div className="mt-1">
                      <select
                        id="font-size"
                        name="font-size"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>Small</option>
                        <option selected>Medium</option>
                        <option>Large</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sidebar Position</label>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer bg-white shadow-sm hover:border-blue-500">
                        <div className="w-full h-20 flex">
                          <div className="w-1/4 bg-gray-200 h-full"></div>
                          <div className="w-3/4 bg-white h-full"></div>
                        </div>
                        <div className="text-sm font-medium">Left</div>
                      </div>
                      <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer bg-gray-100 hover:border-blue-500">
                        <div className="w-full h-20 flex">
                          <div className="w-3/4 bg-white h-full"></div>
                          <div className="w-1/4 bg-gray-200 h-full"></div>
                        </div>
                        <div className="text-sm font-medium">Right</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSaveAppearance}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings