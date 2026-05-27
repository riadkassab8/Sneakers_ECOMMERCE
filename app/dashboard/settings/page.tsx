'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguageStore } from '@/lib/language-store'
import {
  Store,
  Bell,
  Shield,
  CreditCard,
  Truck,
  Mail,
  Save,
  Check,
} from 'lucide-react'

export default function SettingsPage() {
  const { t, language } = useLanguageStore()
  const isRTL = language === 'ar'
  const [activeTab, setActiveTab] = useState('store')
  const [saved, setSaved] = useState(false)

  const tabs = [
    { id: 'store', label: language === 'ar' ? 'المتجر' : 'Store', icon: Store },
    { id: 'notifications', label: language === 'ar' ? 'الإشعارات' : 'Notifications', icon: Bell },
    { id: 'security', label: language === 'ar' ? 'الأمان' : 'Security', icon: Shield },
    { id: 'payments', label: language === 'ar' ? 'المدفوعات' : 'Payments', icon: CreditCard },
    { id: 'shipping', label: language === 'ar' ? 'الشحن' : 'Shipping', icon: Truck },
    { id: 'email', label: language === 'ar' ? 'البريد الإلكتروني' : 'Email', icon: Mail },
  ]

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const renderStoreSettings = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
          {language === 'ar' ? 'اسم المتجر' : 'Store Name'}
        </label>
        <input
          type="text"
          defaultValue="SNKRVAULT"
          className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
          {language === 'ar' ? 'وصف المتجر' : 'Store Description'}
        </label>
        <textarea
          rows={3}
          defaultValue="Premium sneaker store featuring exclusive drops and limited editions"
          className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent resize-none ${isRTL ? 'text-right' : ''}`}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
            {language === 'ar' ? 'العملة' : 'Currency'}
          </label>
          <select className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="SAR">SAR (ر.س)</option>
            <option value="AED">AED (د.إ)</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
            {language === 'ar' ? 'المنطقة الزمنية' : 'Timezone'}
          </label>
          <select className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}>
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time (EST)</option>
            <option value="PST">Pacific Time (PST)</option>
            <option value="AST">Arabia Standard Time (AST)</option>
          </select>
        </div>
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
          {language === 'ar' ? 'البريد الإلكتروني للدعم' : 'Support Email'}
        </label>
        <input
          type="email"
          defaultValue="support@snkrvault.com"
          className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
        />
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      {[
        { label: language === 'ar' ? 'طلبات جديدة' : 'New Orders', description: language === 'ar' ? 'إشعار عند استلام طلب جديد' : 'Get notified when a new order is placed' },
        { label: language === 'ar' ? 'انخفاض المخزون' : 'Low Stock', description: language === 'ar' ? 'تنبيه عندما ينخفض المخزون' : 'Alert when inventory is running low' },
        { label: language === 'ar' ? 'تقييمات العملاء' : 'Customer Reviews', description: language === 'ar' ? 'إشعار عند إضافة تقييم جديد' : 'Notify when a new review is added' },
        { label: language === 'ar' ? 'تقارير أسبوعية' : 'Weekly Reports', description: language === 'ar' ? 'استلام تقارير المبيعات الأسبوعية' : 'Receive weekly sales reports' },
        { label: language === 'ar' ? 'تنبيهات الأمان' : 'Security Alerts', description: language === 'ar' ? 'تنبيهات حول أنشطة الحساب المشبوهة' : 'Alerts about suspicious account activity' },
      ].map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-4 bg-secondary/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <div className={isRTL ? 'text-right' : ''}>
            <p className="font-medium">{item.label}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-accent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </label>
        </div>
      ))}
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
          {language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
        </label>
        <input
          type="password"
          className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
          {language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
        </label>
        <input
          type="password"
          className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
          {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
        </label>
        <input
          type="password"
          className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
        />
      </div>
      <div className={`p-4 bg-secondary/50 rounded-lg ${isRTL ? 'text-right' : ''}`}>
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div>
            <p className="font-medium">{language === 'ar' ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}</p>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'أضف طبقة إضافية من الأمان' : 'Add an extra layer of security'}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-accent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </label>
        </div>
      </div>
    </div>
  )

  const renderPaymentSettings = () => (
    <div className="space-y-4">
      <p className={`text-muted-foreground mb-4 ${isRTL ? 'text-right' : ''}`}>
        {language === 'ar' ? 'إدارة طرق الدفع المقبولة' : 'Manage accepted payment methods'}
      </p>
      {[
        { name: 'Stripe', description: language === 'ar' ? 'بطاقات الائتمان والخصم' : 'Credit & Debit Cards' },
        { name: 'PayPal', description: language === 'ar' ? 'مدفوعات بايبال' : 'PayPal Payments' },
        { name: 'Apple Pay', description: language === 'ar' ? 'أبل باي' : 'Apple Pay' },
        { name: 'Google Pay', description: language === 'ar' ? 'جوجل باي' : 'Google Pay' },
        { name: 'Mada', description: language === 'ar' ? 'بطاقات مدى' : 'Mada Cards' },
      ].map((method, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-4 bg-secondary/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <div className={isRTL ? 'text-right' : ''}>
            <p className="font-medium">{method.name}</p>
            <p className="text-sm text-muted-foreground">{method.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={index < 3} className="sr-only peer" />
            <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-accent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </label>
        </div>
      ))}
    </div>
  )

  const renderShippingSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
            {language === 'ar' ? 'حد الشحن المجاني' : 'Free Shipping Threshold'}
          </label>
          <input
            type="number"
            defaultValue="150"
            className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
            {language === 'ar' ? 'تكلفة الشحن الافتراضية' : 'Default Shipping Cost'}
          </label>
          <input
            type="number"
            defaultValue="9.99"
            className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}
          />
        </div>
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
          {language === 'ar' ? 'وقت المعالجة' : 'Processing Time'}
        </label>
        <select className={`w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent ${isRTL ? 'text-right' : ''}`}>
          <option value="1-2">{language === 'ar' ? '1-2 أيام عمل' : '1-2 business days'}</option>
          <option value="2-3">{language === 'ar' ? '2-3 أيام عمل' : '2-3 business days'}</option>
          <option value="3-5">{language === 'ar' ? '3-5 أيام عمل' : '3-5 business days'}</option>
        </select>
      </div>
      <div className={`p-4 bg-secondary/50 rounded-lg ${isRTL ? 'text-right' : ''}`}>
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div>
            <p className="font-medium">{language === 'ar' ? 'الشحن الدولي' : 'International Shipping'}</p>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'تفعيل الشحن إلى جميع الدول' : 'Enable shipping to all countries'}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-accent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </label>
        </div>
      </div>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-4">
      <p className={`text-muted-foreground mb-4 ${isRTL ? 'text-right' : ''}`}>
        {language === 'ar' ? 'تخصيص رسائل البريد الإلكتروني الآلية' : 'Customize automated email messages'}
      </p>
      {[
        { label: language === 'ar' ? 'تأكيد الطلب' : 'Order Confirmation', description: language === 'ar' ? 'إرسال عند تأكيد الطلب' : 'Sent when order is confirmed' },
        { label: language === 'ar' ? 'إشعار الشحن' : 'Shipping Notification', description: language === 'ar' ? 'إرسال عند شحن الطلب' : 'Sent when order is shipped' },
        { label: language === 'ar' ? 'تأكيد التسليم' : 'Delivery Confirmation', description: language === 'ar' ? 'إرسال عند تسليم الطلب' : 'Sent when order is delivered' },
        { label: language === 'ar' ? 'طلب المراجعة' : 'Review Request', description: language === 'ar' ? 'طلب مراجعة المنتج' : 'Request product review' },
        { label: language === 'ar' ? 'السلة المتروكة' : 'Abandoned Cart', description: language === 'ar' ? 'تذكير بالسلة المتروكة' : 'Reminder for abandoned cart' },
      ].map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-4 bg-secondary/50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <div className={isRTL ? 'text-right' : ''}>
            <p className="font-medium">{item.label}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-accent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
          </label>
        </div>
      ))}
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'store':
        return renderStoreSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'security':
        return renderSecuritySettings()
      case 'payments':
        return renderPaymentSettings()
      case 'shipping':
        return renderShippingSettings()
      case 'email':
        return renderEmailSettings()
      default:
        return renderStoreSettings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className={`text-2xl font-bold ${isRTL ? 'text-right' : ''}`}>{t('dashboard.settings')}</h2>

      <div className={`flex flex-col lg:flex-row gap-6 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            {renderContent()}

            {/* Save Button */}
            <div className={`flex mt-6 pt-6 border-t border-border ${isRTL ? 'justify-start' : 'justify-end'}`}>
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {saved ? (
                  <>
                    <Check className="w-5 h-5" />
                    {language === 'ar' ? 'تم الحفظ' : 'Saved'}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {t('dashboard.save')}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
