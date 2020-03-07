class ResetPasswordMailer < ApplicationMailer
  default from: ENV['DEFAULT_FROM_EMAIL']

  # send a reset password email when a user loses password
  def call(*args)
    @email, @token = args

    mail(:to => @email, :subject => 'Password Reset')
  end
end
