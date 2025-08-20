'use client'

import React, { useState } from 'react'
import { 
  Mail, Lock, Eye, EyeOff, User, Building, MessageSquare, 
  Loader2, CheckCircle, AlertCircle, ArrowLeft, ExternalLink,
  Chrome, Users, Briefcase, Info
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

// Auth Button Component with all variants
interface AuthButtonProps {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'default' | 'lg'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function AuthButton({
  children,
  variant = 'default',
  size = 'default',
  loading = false,
  disabled = false,
  onClick,
  className = ""
}: AuthButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      className={`atlas-button-states atlas-focus-ring touch-target ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="icon-sm animate-spin mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  )
}

// SSO Button Component
interface SSOButtonProps {
  provider: 'google' | 'microsoft'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

export function SSOButton({ provider, loading = false, disabled = false, onClick, className = "" }: SSOButtonProps) {
  const providerConfig = {
    google: {
      name: 'Google',
      icon: <Chrome className="icon-sm" />,
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    microsoft: {
      name: 'Microsoft',
      icon: <Users className="icon-sm" />,
      color: 'hover:bg-orange-50 hover:border-orange-200'
    }
  }

  const config = providerConfig[provider]

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full atlas-button-states atlas-focus-ring touch-target
        ${config.color}
        ${className}
      `}
    >
      {loading ? (
        <Loader2 className="icon-sm animate-spin mr-2" />
      ) : (
        config.icon
      )}
      <span className="ml-2">
        {loading ? 'Connecting...' : `Continue with ${config.name}`}
      </span>
    </Button>
  )
}

// Inline Alert Component
interface InlineAlertProps {
  type: 'success' | 'error' | 'info' | 'warning'
  children: React.ReactNode
  className?: string
}

export function InlineAlert({ type, children, className = "" }: InlineAlertProps) {
  const config = {
    success: {
      icon: <CheckCircle className="icon-sm" />,
      className: 'border-success bg-success/5 text-success-foreground'
    },
    error: {
      icon: <AlertCircle className="icon-sm" />,
      className: 'border-destructive bg-destructive/5 text-destructive-foreground'
    },
    info: {
      icon: <Info className="icon-sm" />,
      className: 'border-info bg-info/5 text-info-foreground'
    },
    warning: {
      icon: <AlertCircle className="icon-sm" />,
      className: 'border-warning bg-warning/5 text-warning-foreground'
    }
  }

  const alertConfig = config[type]

  return (
    <Alert className={`${alertConfig.className} ${className}`}>
      {alertConfig.icon}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

// Auth Form Component
interface AuthFormField {
  id: string
  label: string
  type: 'email' | 'password' | 'text'
  required?: boolean
  placeholder?: string
  error?: string
}

interface AuthFormProps {
  title: string
  description?: string
  fields: AuthFormField[]
  submitLabel: string
  loading?: boolean
  error?: string
  success?: string
  onSubmit?: (data: Record<string, string>) => void
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  showSSO?: boolean
  showDemoCredentials?: boolean
  className?: string
}

export function AuthForm({
  title,
  description,
  fields,
  submitLabel,
  loading = false,
  error,
  success,
  onSubmit,
  secondaryAction,
  showSSO = true,
  showDemoCredentials = false,
  className = ""
}: AuthFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
    
    // Clear field error when user starts typing
    if (fieldErrors[fieldId]) {
      setFieldErrors(prev => ({ ...prev, [fieldId]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const errors: Record<string, string> = {}
    fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        errors[field.id] = `${field.label} is required`
      }
      
      if (field.type === 'email' && formData[field.id] && !formData[field.id].includes('@')) {
        errors[field.id] = 'Please enter a valid email address'
      }
    })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    onSubmit?.(formData)
  }

  const fillDemoCredentials = () => {
    setFormData({
      email: 'abc@abc.com',
      password: 'abc'
    })
  }

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Demo credentials info */}
        {showDemoCredentials && (
          <InlineAlert type="info">
            <div className="space-y-2">
              <p className="font-medium text-sm">Demo Account Available</p>
              <p className="text-xs">
                Email: <code className="bg-muted px-1 rounded">abc@abc.com</code><br />
                Password: <code className="bg-muted px-1 rounded">abc</code>
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={fillDemoCredentials}
                className="mt-2 text-xs atlas-hover atlas-focus-ring"
              >
                Use Demo Credentials
              </Button>
            </div>
          </InlineAlert>
        )}

        {/* Global alerts */}
        {error && (
          <InlineAlert type="error">
            {error}
          </InlineAlert>
        )}

        {success && (
          <InlineAlert type="success">
            {success}
          </InlineAlert>
        )}

        {/* SSO buttons */}
        {showSSO && (
          <>
            <div className="space-y-2">
              <SSOButton
                provider="google"
                loading={loading}
                onClick={() => console.log('Google SSO')}
              />
              <SSOButton
                provider="microsoft"
                loading={loading}
                onClick={() => console.log('Microsoft SSO')}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>
          </>
        )}

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              
              <div className="relative">
                <Input
                  id={field.id}
                  type={field.type === 'password' && showPassword ? 'text' : field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  disabled={loading}
                  className={`
                    atlas-focus-ring
                    ${fieldErrors[field.id] ? 'border-destructive focus:ring-destructive/20' : ''}
                  `}
                />
                
                {field.type === 'password' && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 atlas-hover"
                  >
                    {showPassword ? <EyeOff className="icon-xs" /> : <Eye className="icon-xs" />}
                  </Button>
                )}
              </div>
              
              {fieldErrors[field.id] && (
                <p className="text-xs text-destructive">{fieldErrors[field.id]}</p>
              )}
            </div>
          ))}

          <AuthButton
            variant="default"
            size="lg"
            loading={loading}
            onClick={handleSubmit}
            className="w-full"
          >
            {submitLabel}
          </AuthButton>
        </form>
      </CardContent>

      {secondaryAction && (
        <CardFooter className="justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={secondaryAction.onClick}
            disabled={loading}
            className="atlas-hover atlas-focus-ring"
          >
            {secondaryAction.label}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

// Sign In Page Component
interface SignInPageProps {
  onBack?: () => void
  onSignInSuccess?: (userData: { name: string; email: string }) => void
}

export function SignInPage({ onBack, onSignInSuccess }: SignInPageProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleSignIn = (data: Record<string, string>) => {
    setLoading(true)
    setError('')

    // Check for demo credentials
    if (data.email === 'abc@abc.com' && data.password === 'abc') {
      setTimeout(() => {
        setLoading(false)
        onSignInSuccess?.({
          name: 'Demo User',
          email: 'abc@abc.com'
        })
      }, 1000)
      return
    }

    // Simulate API call for other credentials
    setTimeout(() => {
      if (data.email === 'error@test.com') {
        setError('Invalid email or password. Please try again.')
        setLoading(false)
      } else {
        // For demo purposes, accept any other email/password combination
        setLoading(false)
        onSignInSuccess?.({
          name: data.email.split('@')[0],
          email: data.email
        })
      }
    }, 1500)
  }

  const handleForgotPassword = (data: Record<string, string>) => {
    setLoading(true)
    
    setTimeout(() => {
      console.log('Password reset sent to:', data.email)
      setLoading(false)
      setShowForgotPassword(false)
    }, 1000)
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={() => setShowForgotPassword(false)}
            disabled={loading}
            className="mb-4 atlas-hover atlas-focus-ring"
          >
            <ArrowLeft className="icon-sm mr-2" />
            Back to sign in
          </Button>

          <AuthForm
            title="Reset Password"
            description="Enter your email address and we'll send you a reset link."
            fields={[
              {
                id: 'email',
                label: 'Email',
                type: 'email',
                required: true,
                placeholder: 'Enter your email'
              }
            ]}
            submitLabel="Send Reset Link"
            loading={loading}
            onSubmit={handleForgotPassword}
            showSSO={false}
            showDemoCredentials={false}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            disabled={loading}
            className="mb-4 atlas-hover atlas-focus-ring"
          >
            <ArrowLeft className="icon-sm mr-2" />
            Back to home
          </Button>
        )}

        <AuthForm
          title="Sign In"
          description="Welcome back! Please sign in to your account."
          fields={[
            {
              id: 'email',
              label: 'Email',
              type: 'email',
              required: true,
              placeholder: 'Enter your email'
            },
            {
              id: 'password',
              label: 'Password',
              type: 'password',
              required: true,
              placeholder: 'Enter your password'
            }
          ]}
          submitLabel="Sign In"
          loading={loading}
          error={error}
          onSubmit={handleSignIn}
          showDemoCredentials={true}
          secondaryAction={{
            label: 'Forgot your password?',
            onClick: () => setShowForgotPassword(true)
          }}
        />

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Button variant="ghost" size="sm" className="p-0 h-auto atlas-hover">
              Start free trial
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

// Contact Sales Modal Component
interface ContactSalesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactSalesModal({ isOpen, onClose }: ContactSalesModalProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    employees: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      
      // Auto-close after showing success
      setTimeout(() => {
        onClose()
        setSubmitted(false)
        setFormData({ name: '', email: '', company: '', employees: '', message: '' })
      }, 2000)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md atlas-animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Briefcase className="icon-md" />
            Contact Sales
          </DialogTitle>
          <DialogDescription>
            Tell us about your needs and we'll get back to you within 1-2 business days.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center">
            <CheckCircle className="icon-xl text-success mx-auto mb-4" />
            <h3 className="font-medium mb-2">Thank you for your interest!</h3>
            <p className="text-sm text-muted-foreground">
              We'll reach out to you within 1-2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={loading}
                  className="atlas-focus-ring"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={loading}
                  className="atlas-focus-ring"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  disabled={loading}
                  className="atlas-focus-ring"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employees">Company Size</Label>
                <Select
                  value={formData.employees}
                  onValueChange={(value) => handleInputChange('employees', value)}
                  disabled={loading}
                >
                  <SelectTrigger className="atlas-focus-ring">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-1000">201-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Tell us about your use case</Label>
              <Textarea
                id="message"
                placeholder="How do you plan to use Atlas? What are your main requirements?"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                disabled={loading}
                className="atlas-focus-ring min-h-[80px]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="atlas-hover atlas-focus-ring"
              >
                Cancel
              </Button>
              <AuthButton
                variant="default"
                loading={loading}
                onClick={handleSubmit}
              >
                Send Message
              </AuthButton>
            </div>
          </form>
        )}

        <div className="pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Prefer email?{' '}
            <a 
              href="mailto:sales@atlas.com"
              className="text-primary hover:underline atlas-focus-ring"
            >
              sales@atlas.com
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Free Trial Page Component
interface FreeTrialPageProps {
  onBack?: () => void
  onSignUpSuccess?: (userData: { name: string; email: string }) => void
}

export function FreeTrialPage({ onBack, onSignUpSuccess }: FreeTrialPageProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('starter')

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Free',
      description: '14-day free trial, then $19/month',
      features: [
        'Connect up to 3 sources',
        'Search across 10,000 files',
        'Basic filters and sorting',
        'Email support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$39',
      period: '/month',
      description: '14-day free trial included',
      features: [
        'Connect unlimited sources',
        'Search across unlimited files',
        'Advanced AI search',
        'Custom collections',
        'Priority support',
        'API access'
      ],
      popular: true
    }
  ]

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleStepSubmit = (formData?: Record<string, string>) => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setLoading(true)
      // Simulate account creation
      setTimeout(() => {
        setLoading(false)
        if (formData) {
          onSignUpSuccess?.({
            name: formData.name || 'New User',
            email: formData.email || 'user@example.com'
          })
        }
      }, 2000)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Choose Your Plan</h2>
        <p className="text-muted-foreground">Start with a 14-day free trial, no credit card required</p>
      </div>

      <div className="grid gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`
              relative p-6 border rounded-lg cursor-pointer atlas-hover
              ${selectedPlan === plan.id 
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                : 'border-border hover:border-primary/50'
              }
            `}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.popular && (
              <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            )}
            
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="font-semibold">{plan.name}</h3>
                <div className="text-2xl font-bold">
                  {plan.price}
                  {plan.period && <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selectedPlan === plan.id 
                  ? 'border-primary bg-primary' 
                  : 'border-muted-foreground'
                }
              `}>
                {selectedPlan === plan.id && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                )}
              </div>
            </div>
            
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="icon-xs text-success" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <AuthForm
      title="Create Your Account"
      description="Just a few details to get you started"
      fields={[
        {
          id: 'name',
          label: 'Full Name',
          type: 'text',
          required: true,
          placeholder: 'Enter your full name'
        },
        {
          id: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'Enter your email'
        },
        {
          id: 'company',
          label: 'Company',
          type: 'text',
          required: false,
          placeholder: 'Your company name (optional)'
        },
        {
          id: 'password',
          label: 'Password',
          type: 'password',
          required: true,
          placeholder: 'Create a password'
        }
      ]}
      submitLabel="Create Account"
      loading={loading}
      onSubmit={handleStepSubmit}
      showSSO={true}
      showDemoCredentials={false}
    />
  )

  const renderStep3 = () => (
    <div className="text-center space-y-6">
      <CheckCircle className="icon-xl text-success mx-auto" />
      <div>
        <h2 className="text-2xl font-semibold mb-2">Account Created!</h2>
        <p className="text-muted-foreground">
          Your 14-day free trial has started. Let's connect your first data source.
        </p>
      </div>
      <AuthButton
        variant="default"
        size="lg"
        onClick={() => handleStepSubmit()}
        className="w-full"
      >
        Get Started with Atlas
      </AuthButton>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {onBack && step === 1 && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 atlas-hover atlas-focus-ring"
          >
            <ArrowLeft className="icon-sm mr-2" />
            Back to home
          </Button>
        )}

        {step < 4 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Step {step} of 3</span>
              <span>{Math.round((step / 3) * 100)}% complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="atlas-animate-fade-in">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        {step === 1 && (
          <div className="mt-6 flex justify-end">
            <AuthButton
              variant="default"
              onClick={() => handleStepSubmit()}
            >
              Continue
            </AuthButton>
          </div>
        )}

        {step > 1 && step < 3 && (
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={loading}
              className="atlas-hover atlas-focus-ring"
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}