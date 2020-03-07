class User < ApplicationRecord
  has_secure_password

  # # # #  # # Relations # # # # #
  has_many :reviews

  # # # # # # Validations # # # # #
  validates_presence_of :email
  validates_uniqueness_of :email

  # # # # # Instance Methods # # # # #

  # Generate a new password reset token for a user.
  # Used when 'forgot password?' path is followed
  def generate_password_token!
    self.update_attributes(
      reset_password_token: generate_token,
      reset_password_sent_at: Time.current
    )
  end

  # Check that the password token sent is still valid
  def password_token_valid?
    self.reset_password_sent_at + 2.hours > Time.current
  end

  # Reset the password for a user
  # @param password [String] the new password to use
  def reset_password!(password)
    self.update_attributes(
      reset_password_token: nil,
      password: password
    )
  end

  private

  # Generate a password token using SecureRandom#hex
  def generate_token
    SecureRandom.hex
  end
end
