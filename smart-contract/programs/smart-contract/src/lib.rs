use anchor_lang::prelude::*;
use std::str::FromStr;

declare_id!("2fNDYYpjb7EQRdRfR3FwL1M5sJ95LbBY8TMJDiBrUWXx");

/// Constants for Admin and Owner addresses
const ADMIN_ADDRESS: &str = "BfBNPUANwZhvurFBCR1rZLUvW8MQY4enzLzeAJxsCM8T";

const OWNER_ADDRESS: &str = "6WoVaet3zfK9tJxp7g6psU96jviFvJAthGEQjZE5tFwc";

/// Converts SOL to a fixed-point representation.
pub fn get_price_from_oracle(sol: f64) -> Result<u64> {
    Ok((sol * 100.0) as u64)
}

#[program]
pub mod smart_contract {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    /// Updates the state by transferring funds from a user to an owner.
    pub fn transfer_funds(ctx: Context<FundOperations>, amount: f64) -> Result<()> {
        let sender = ctx.accounts.user.key();
        require!(sender == Pubkey::from_str(ADMIN_ADDRESS).unwrap(), ErrorCode::TransferFailed);

        // Placeholder for funds transfer logic.
        // TODO: Implement the logic to transfer funds.
        
        Ok(())
    }

    /// Adds funds to the user's account.
    pub fn add_fund(ctx: Context<FundOperations>, amount: f64) -> Result<()> {
        let user_stats = &mut ctx.accounts.user_stats;
        user_stats.fund += amount;
        Ok(())
    }

    /// Allows the user to withdraw funds from their account.
    pub fn user_withdraw(ctx: Context<FundOperations>, amount: f64) -> Result<()> {
        let user_stats = &mut ctx.accounts.user_stats;
        require!(user_stats.fund >= amount, ErrorCode::InsufficientFunds);
        user_stats.fund -= amount;
        Ok(())
    }

    /// Allows the owner to withdraw funds.
    pub fn owner_withdraw(ctx: Context<FundOperations>, amount: f64) -> Result<()> {
        let user_stats = &mut ctx.accounts.user_stats;
        require!(user_stats.fund >= amount, ErrorCode::InsufficientFunds);
        user_stats.fund -= amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[account]
#[derive(Default)]
pub struct UserStats {
    name: String,
    fund: f64,
}

/// Context for operations involving funds transfer or modification.
#[derive(Accounts)]
pub struct FundOperations<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds = [b"user-stats", user.key().as_ref()], 
        bump
    )]
    pub user_stats: Account<'info, UserStats>,
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The requested withdrawal amount exceeds the available funds.")]
    InsufficientFunds,

    #[msg("Transfer of funds failed.")]
    TransferFailed,
}
